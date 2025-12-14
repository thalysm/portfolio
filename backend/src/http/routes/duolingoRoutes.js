
const express = require('express');
const router = express.Router();
const duolingoController = require('../controllers/duolingoController');

router.get('/duolingo', duolingoController.getData);

module.exports = router;
