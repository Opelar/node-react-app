const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');
const movieUrlListController = require('../controllers/movieUrlList');

/* GET fetch test. */
router.get('/test', testController.test);
router.get('/movieurl/list', movieUrlListController.getMovieUrlList);

module.exports = router;
