const Test = require('../models/test');
const MovieUrl = require('../models/movieUrl');

// @todo
exports.test = function(req, res, next) {
  MovieUrl.find({}).then(list => {
    res.send({
      data: list
    });
  });
};
