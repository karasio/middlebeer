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

barsRouter.get('/:id', async (request, response) => {
  const userId = request.params.id;
  console.log(userId);
  const bars = await  Bar
      .find({user: userId});
  response.json(bars.map(bar => bar.toJSON()));
});

barsRouter.put('/:id', async (request, response) =>{
  const body = request.body;
  /*const bar = new Bar({
    newName: body.name,
    newAddress: body.address,
    newCity: body.city,
    newPrices: body.prices,
    likes: body.likes === undefined ? 0 : body.likes,
    newUser: user._id
  });*/
  const updatedBar = await Bar.updateOne(
      {name: body.name},
      {
        $set :{likes: body.likes},
      }
  );
  //TODO: Tänne viel joku järkevämpi palautus.
  response.send("Bar liked!");


});

barsRouter.put('/', async (request, response, next) => {
  const body = request.body;
  console.log("body", body);

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      console.log('back/controller/bars/65');
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);
    const bar = new Bar({
      newName: body.name,
      newAddress: body.address,
      newCity: body.city,
      newPrices: body.prices,
      likes: body.likes === undefined ? 0 : body.likes,
      newUser: user._id
    });
    const updatedBar = await Bar.updateOne(
        {name: body.name},
        {
          $set :{address: body.address, city: body.city, prices: body.prices, user: user._id},
        }
    );
    console.log("updated bar", updatedBar);
    //TODO: Tänne viel joku järkevämpi palautus.
    response.send("Bar updated!");
  } catch (exception) {
    next(exception);
  }
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