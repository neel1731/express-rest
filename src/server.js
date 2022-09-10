const express = require('express');
const cors = require('cors');
const passport = require('passport');
const schedule = require('node-schedule');

const { PORT } = require('./config/env-vars');
const { Jwt } = require('./config/passport');
const { Connect } = require('./config/mongoose');
const { DeleteExpiredTask } = require('./api/task/task.controller');

const app = express();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use('jwt', Jwt);

app.use('/api', require('./api/routes'));

schedule.scheduleJob('*/1 * * * *', function(){
  console.log('This job run at' + new Date());
});

app.listen(PORT, () => {
  console.log('Server is listening on PORT ::', PORT);
  Connect();
});

module.exports = app;