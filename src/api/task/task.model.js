const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  name:  { 
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  formNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  dateTime: {
    type: Date,
    require: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('tasks', TaskSchema);
