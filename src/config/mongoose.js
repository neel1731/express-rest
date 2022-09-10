const mongoose = require('mongoose');
const { NODE_ENV, MONGO_URI } = require('./env-vars');

mongoose.Promise = global.Promise;

mongoose.set('debug', NODE_ENV === 'development');

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection Error ${err}`);
});

mongoose.connection.on('connected', () => {
  console.log('Connected To DB');
});

exports.Connect = () => {
  mongoose.connect(MONGO_URI);
  return mongoose.connection;
};