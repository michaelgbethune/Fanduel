var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(req.app.locals.input));
});


module.exports = router;
