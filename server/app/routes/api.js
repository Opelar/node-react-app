const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');

/* GET fetch test. */
router.get('/test', testController.test);

module.exports = router;
