const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('users', UserSchema);