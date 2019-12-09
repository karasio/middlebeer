const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

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

  test('some bar testing', async () => {
    const bars = await api
        .get('/api/bars/')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    console.log(bars.body);
    expect(bars.body.length).toBe(2);
  });

  test('identifier is id field not _id', async () => {
    const response = await api.get('/api/bars/');
    const ids = response.body.map(r => r.id);
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
    const originalUsers = await helper.usersInDb();
    //console.log(originalUsers);
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'test'
    };

    //console.log(newUser);
    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const newUsers = await helper.usersInDb();
    console.log(newUsers);

    expect(newUsers.length).toBe(originalUsers.length + 1);
  })

  test('creation fails if username exists already', async () => {
    const originalUsers = await helper.usersInDb();

    const newUser = {
      username: 'test',
      name: 'test',
      password: 'test'
    };

    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const newUsers = await helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length + 1);
  });

  test('creation fails without a username', async () => {
    const originalUsers = await helper.usersInDb();

    const newUser = {
      name: 'megauser',
      password: 'ii3333'
    };

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` is required');

    const newUsers = await helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length);
  });

  test('creation fails with too short password', async () => {
    const originalUsers = await helper.usersInDb();

    const newUser = {
      username: 'megaman22',
      name: 'megauser',
      password: 'ii'
    };

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
    .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password (min. 3 characters) needs to be defined');

    const newUsers = await helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length);
  });

  // TODO EI TOIMI
  // test('add blog with user', async () => {
  //   const originalBars = await helper.barsInDb();
  //   const users = await helper.usersInDb();
  //   const someUser = users[0];
  //   someUser.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtha2UiLCJpZCI6IjVkZGU2ZjJlZTQ0MGI0MjI3Yzg5MWRjZSIsImlhdCI6MTU3NTg5MDg4NH0.5Mn_eo4Q_nxcNGaioglF7MKO3hI1-JV8aC_ywEnYneE';
  //
  //
  //   const newBar = {
  //     name: 'Hilton',
  //     address: 'Some street',
  //     city: 'Some city',
  //     prices: {
  //       beer: 12
  //     },
  //     userId: someUser.id
  //   };
  //
  //   await api
  //   .post('/api/bars')
  //   .send(newBar)
  //   .expect(200)
  //   .expect('Content-Type', /application\/json/);
  //
  //   const newBars = await helper.barsInDb();
  //   expect(newBars.length).toBe(originalBars.length + 1);
  // });

});

afterAll(() => {
  mongoose.connection.close();
});