const path = require('path');

const express = require('express');

const logInOutController = require('../controllers/log-in-out');

const router = express.Router();

router.get('/', logInOutController.getLogIn);

router.post('/login', logInOutController.postLogIn);

router.get('/logout', logInOutController.getLogOut);


module.exports = router;