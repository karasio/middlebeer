const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');


const Bar = require('../models/bar');
const User = require('../models/user');
const helper = require('./test_helper.js');

describe('when there is initially something saved', () => {
  beforeEach(async () => {
    await Bar.deleteMany();

    let barObject = new Bar(helper.initialBars[0]);
    await barObject.save();

    barObject = new Bar(helper.initialBars[1]);
    await barObject.save();
  });

  test('bars returned as json', async () => {
    await api
    .get('/api/bars/')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  });

  test('identifier is id field not _id', async () => {
    const response = await api.get('/api/bars/');
    //console.log(response.body);
    const ids = response.body.map(r => r.id);
    //console.log(ids);
    ids.map(id => expect(id).toBeDefined());
  });
});

describe('signed in user procedures', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'sekret' });
    await user.save();
  });

  test('register new user', async () => {
    const originalUsers = helper.usersInDb();

    const userPassword = 'test';
    const newUser = {
      username: 'test',
      name: 'test',
    };

    const saltRounds = 10;

    newUser.passwordHash = await bcrypt.hash(userPassword, saltRounds);

    await api
        .post('api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const newUsers = helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length + 1);
  })
})

afterAll(() => {
  mongoose.connection.close();
});