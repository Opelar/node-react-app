const Test = require('../models/test');

// @todo
exports.test = function (req, res, next) {
  console.log(Test); // Model { Test }
  res.send({
    data: [
      {
        id: '0',
        name: 'express'
      },
      {
        id: '1',
        name: 'react'
      }
    ]
  })
};


