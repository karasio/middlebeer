const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

/**
 * Defines bar schema for mongo database
 */

const barSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  prices: {
    beer: Number,
    cider: Number,
    longdrink: Number,
  },
  likes: Number
});

barSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Bar', barSchema);