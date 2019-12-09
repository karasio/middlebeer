const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('bars', { user:0 });
  response.json(users.map(u => u.toJSON()));
});

usersRouter.get('/:id', async (request, response) => {
  console.log('Mennään');
  const userId = request.params.id;
  console.log(userId);
  const user = await User.findById(userId);
  console.log(user);
  const bars = await User
  .find({_id: userId}).populate('bars', {user: 0});
  response.json(bars.map(bar => bar.toJSON()));
});

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

// to save default city to db
usersRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;
    console.log('TÄRKEE BODY', body);

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = { defaultCity: body.defaultCity };
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: body.defaultCity });
    // returns the altered user ONLY
    console.log(updatedUser);
    response.json(updatedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;