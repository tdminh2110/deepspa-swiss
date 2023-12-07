
const express = require('express');

const waitController = require('../controllers/wait');

const router = express.Router();

// /wait/uploadingfiles => GET
router.get('/uploadingfiles', waitController.uploadingFiles);

module.exports = router;