const { Router } = require('express');

const taskController = require('./task.controller');
const { Authorize } = require('../../middleware/auth');

const router = Router();

router.get('./', Authorize(), taskController.List);
router.post('./', Authorize(), taskController.Create);
router.put('./', Authorize(), taskController.Update);

module.exports = router;