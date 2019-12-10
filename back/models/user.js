const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

/**
 * Defines user schema for mongo database
 */
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: String,
  bars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bar'
    }
  ],
  defaultCity: String
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
