const { Router } = require('express');

const userController = require('./user.controller');

const router = Router();

router.post('./login', userController.Login);
router.post('./register', userController.Register);

module.exports = router;