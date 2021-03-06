const barsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Bar = require('../models/bar');
const User = require('../models/user');

/**
 * Handles contacts to MongoDB regarding bars
 */

/**
 * GET request for getting all bars from database
 * response: all bars as json
 */
barsRouter.get('/', async (request, response) => {
  const bars = await Bar
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(bars.map((bar) => bar.toJSON()));
});

/**
 * GET request for getting a specific bar with id from database
 * response: bar information as json
 */
barsRouter.get('/:id', async (request, response) => {
  const barId = request.params.id;
  const bar = await Bar
    .find({ _id: barId }).populate('user', { username: 1, name: 1 });
  response.json(bar);
});

/**
 * PUT request for changing specific bar data with id value in database
 * validates user with json web token
 * Changeable values: likes & prices
 * response: all bars as json
 */
barsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const bar = {
      prices: body.prices,
      likes: body.likes,
    };

    await Bar.findByIdAndUpdate(request.params.id, bar, { new: body.likes, new: body.prices });
    const bars = await Bar
      .find({}).populate('user', { username: 1, name: 1 });
    //  console.log('bars', bars);
    response.json(bars.map((bar) => bar.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

/**
 * POST request for adding a bar to database
 * validates user with json web token
 * response: all bars as json
 */
barsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      //  console.log('back/controller/bars/65');
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const bar = new Bar({
      name: body.name,
      address: body.address,
      city: body.city,
      prices: body.prices,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id,
    });

    const savedBar = await bar.save();
    user.bars = user.bars.concat(savedBar._id);
    await user.save();
    const bars = await Bar
      .find({}).populate('user', { username: 1, name: 1 });
    //  console.log('bars', bars);
    response.json(bars.map((bar) => bar.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

/**
 * DELETE request for deleting a bar with specific id from database
 * validates user with json web token => bar deleting possible only for person who added it
 * response: status 204 if succeeded, 403 if not
 */

barsRouter.delete('/:id', async (request, response, next) => {
  const bar = await Bar.findById(request.params.id);

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    // console.log('decoded token', decodedToken);

    const user = await User.findById(decodedToken.id);
    // console.log('user', user);

    if (bar.user.toString() === user.id.toString()) {
      try {
        await Bar.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } catch (exception) {
        next(exception);
      }
    } else {
      return response.status(403).json({ error: 'only bar adder can delete' });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = barsRouter;
