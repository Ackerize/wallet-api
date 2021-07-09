var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');

/* GET users listing. */
router.post('/', userController.create);
router.post('/login', userController.findOne);

module.exports = router;
