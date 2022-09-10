require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
}