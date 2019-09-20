const MovieUrl = require('../../spiders/movies/movieUrl');

exports.getMovieUrlList = function (req, res, next) {
  const { p, size } = req.query;
  const query = MovieUrl.find({});

  query.skip((parseInt(p) - 1) * parseInt(size));
  query.limit(parseInt(size));
  query.exec((err, result) => {
    if (err) return next(err);
    res.json(result);
  })
};
