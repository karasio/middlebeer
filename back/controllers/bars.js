const barsRouter = require('express').Router();
const Bar = require('../models/bar');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('täälööä');
    return authorization.substring(7);
  }
  return null;
};

barsRouter.get('/', async (request, response) => {
  const bars = await Bar
  .find({}).populate('user', { username: 1, name: 1 });
  console.log(bars);
  response.json(bars.map(bar => bar.toJSON()));
});

barsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      console.log('back/controller/bars/65');
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const bar = new Bar({
      name: body.name,
      address: body.address,
      city: body.city,
      prices: body.prices,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    });

    const savedBar = await bar.save();
    user.bars = user.bars.concat(savedBar._id);
    await user.save();
    response.json(savedBar.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = barsRouter;