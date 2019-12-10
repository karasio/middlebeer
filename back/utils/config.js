require('dotenv').config();

/**
 * Helper for database connection.
 * Uses dotenv to get MongoDB url & port
 */

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT
};