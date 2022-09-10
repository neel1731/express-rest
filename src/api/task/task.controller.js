const httpStatus = require('http-status');
const moment = require('moment');

const Task = require('./task.model');

const  CreateTask = (name, description, dateTime, id) => new Promise(async (resolve, reject) => {
  try {
    const task = await Task.findOne().sort({ createdAt: -1 }).select('formNumber');
    const date = new Date();
    let formNumber = `${date.getDate()}${date.getMonth()}${date.getFullYear()}_0`;
    if (task) {
      const lastNumber = +task.formNumber.split('_')[1];
      formNumber = `${date.getDate()}${date.getMonth()}${date.getFullYear()}${lastNumber + 1}`
    }
    const newTask = await Task.create({
      name,
      description,
      dateTime: moment(dateTime),
      formNumber,
      user: id,
    });
    resolve(newTask)
  } catch(err) {
    reject(err);
  }
});

const Create = async (req, res) => {
  const { name, description, dateTime } = req.body;
  const { _id } = req.user;
  if (moment(dateTime) < moment().unix()) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'Date time should be in future'
    });
  }
  try {
    const task = await CreateTask(name, description, dateTime, _id);
    res.status(httpStatus.CREATED).json(task);
  } catch (err) {
    if (error.name === 'MongoError' && error.code === 11000) {
      const task = await CreateTask(name, description, dateTime, _id);
      res.status(httpStatus.CREATED).json(task);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Internal server error'
      });
    }
  }
}

const Update = async (req, res) => {
  try {
    const { name, description, dateTime } = req.body;
    const { id } = req.params;
    if (moment(dateTime) < moment().unix()) {
      res.status(httpStatus.BAD_REQUEST).json({
        message: 'Date time should be in future'
      });
    }
    const task = await Task.findOneAndUpdate({_id: id }, {
      $set: {
        name, description, dateTime: moment(dateTime)
      }
    }, {new: true });
    res.status(httpStatus.CREATED).json(task);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal server error'
    });
  }
}

const List = async (req, res) => {
  try {
    const query = {}
    const reqQuery = req.query;
    if (reqQuery.id) {
      query.user = reqQuery.id;
    }
    const { page = 1, perPage = 25 } = reqQuery;
    const tasks = await Task.find(query).skip((page - 1) * perPage).limit(perPage);
    res.status(httpStatus.CREATED).json(tasks);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal server error'
    });
  }
}

const DeleteExpiredTask = async () => {
  await Task.deleteMany({
    dateTime: { $lite: moment()}
  })
}

module.exports = {
  Create,
  Update,
  List,
  DeleteExpiredTask,
}
