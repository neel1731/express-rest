const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.model');
const { JWT_SECRET } = require('../../config/env-vars');

const Register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = await user.findOne({ username });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        message: 'User already exists'
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const registeredUser = await User.create({
      username,
      name,
      password: hashpassword,
    })
    res.status(httpStatus.CREATED).json(registeredUser);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message || 'Internal server error'
    });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Invalid credentials'
      });
    }
    const token = jwt.sign(user.toJSON(), JWT_SECRET, {
      expiresIn: '30m',
    });
    res.status(httpStatus.Ok).json({
      user,
      token,
    })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message || 'Internal server error'
    });
  }
};

const List = async (req, res) => {
  try {
    const { page = 1, perPage = 25 } = req.query;
    const tasks = await User.find().skip((page -1) * perPage).limit(perPage);
    res.status(httpStatus.CREATED).json(tasks);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal server error'
    });
  } 
};

module.exports = {
  Register,
  Login,
  List,
}
