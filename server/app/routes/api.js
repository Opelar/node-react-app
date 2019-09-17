var express = require('express');
var router = express.Router();

/* GET fetch test. */
router.get('/test', function(req, res, next) {
  res.json({
    data: [
      {
        id: '0',
        title: 'express'
      },
      {
        id: '1',
        title: 'react'
      }
    ]
  });
});

module.exports = router;
