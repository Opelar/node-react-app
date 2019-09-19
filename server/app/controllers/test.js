const Test = require('../models/test');
const MovieUrl = require('../../spiders/movies/movieUrl');

// @todo
exports.test = function(req, res, next) {
  MovieUrl.find({}).then(list => {
    res.send({
      data: list
    });
  });
};
