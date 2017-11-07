var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('week', {week:req.params.weekid, title: 'Spider 2 Y Banana' , locals: req.app.locals})
}).get('/week/:weekid', function (req, res) {
  res.render('week', {week:req.params.weekid, title: 'Spider 2 Y Banana' , locals: req.app.locals})
}).get('/player/:playerid', function (req, res) {
  res.render('player', {player:req.params.playerid, title: 'Spider 2 Y Banana' , locals: req.app.locals})
});

module.exports = router;
