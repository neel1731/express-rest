const { Router } = require('express');

const router = Router();

router.use('/auth', require('./user/user.routes'));
router.use('/task', require('./task/task.routes'))

module.exports = router;