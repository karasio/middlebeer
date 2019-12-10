const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * Handles contacts to MongoDB regarding users
 */

/**
 * GET request to get all users
 * response: all users as json
 */
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('bars', { user:0 });
  response.json(users.map(u => u.toJSON()));
});

/**
 * GET request for getting a specific user with id from database
 * response: user information as json
 */
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


/**
 * POST request for adding a user to database
 * Uses bcrypt to encrypt user password and password hash is saved to database
 * response: added user as json or status 401 if password is too short
 */
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

/**
 * PUT request for changing user information with id value in database
 * validates user with json web token
 * Changeable values: default city
 * response: altered user as json
 */
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
    console.log(updatedUser);
    response.json(updatedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;