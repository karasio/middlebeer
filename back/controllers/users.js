const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('bars', { name: 1, addres: 1 });

  console.log(users);
  response.json(users.map(u => u.toJSON()));
});

//TODO: kommentin muokkaus niin, että hakee käyttäjän tykkäämät baarit
/*usersRouter.get('/:id', async (request, response) => {
  console.log('Mennään');
  const userId = request.params.id
  console.log(userId);
  const user = await User.findById(userId);
  console.log(user);
  const bars = await User
  .find({_id: userId}).populate('bars', {name: 1, address: 1,});
  response.json(bars.map(bar => bar.toJSON()));
});*/

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    if(body.password.length < 3) {
      return response.status(401).json({ error: 'password (min. 3 characters) needs to be defined' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;