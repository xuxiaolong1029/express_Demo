var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = {
    title:'深圳市',
    name:"Mr.light",
    age:20,
    city:'东莞市'
  };
  res.render('index', {title: '极昼资本'});
});
module.exports = router;
