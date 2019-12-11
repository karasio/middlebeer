const Bar = require('../models/bar');
const User = require('../models/user');

const initialBars = [
  {
    name: 'Iltakoulu',
    address: 'Vaasankatu 5',
    city: 'Helsinki',
    prices: {
      beer: 5.0,
      cider: 6.5,
      longdrink: 6.5,
    },
  },
  {
    name: 'Helsing',
    address: 'Kaarlenkatu 3',
    city: 'Helsinki',
    prices: {
      beer: 3.8,
      cider: 5,
      longdrink: 5,
    },
  },
  {
    name: 'Siltanen',
    address: 'Hämeentie 13',
    city: 'Helsinki',
    prices: {
      beer: 7.4,
      cider: 8.5,
      longdrink: 8.3,
    },
  },
];

const initialUsers = [
  {
    username: 'user',
    name: 'user',
    password: 'user',
  },
];

const nonExistingId = async () => {
  const bar = new Bar(
    { name: 'bar to remove', address: 'some address', city: 'some city', }
  );
  await bar.save();
  await bar.remove();

  return bar._id.toString();
};

const barsInDb = async () => {
  const bars = await Bar.find({});
  return bars.map((bar) => bar.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBars, initialUsers, nonExistingId, barsInDb, usersInDb,
};
