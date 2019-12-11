const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

/**
 * Handles contacts to MongoDB regarding login
 */

/**
 * POST request to log user in
 * check password with Bcrypt
 * response: if invalid username or password: status 401
 * else status 200 & user token, username, name and defaultCity (if not undefined)
 */
loginRouter.post('/', async (request, response) => {
  const body = request.body;
  //  console.log('controllers/login.js', body);

  const user = await User.findOne({ username: body.username });
  //  console.log('ctrl login.js', user);
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  //  console.log('tokeni', token);

  if (user.defaultCity) {
    response
      .status(200)
      .send({
        token, username: user.username, name: user.name, defaultCity: user.defaultCity,
      });
  } else {
    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  }
});

module.exports = loginRouter;
