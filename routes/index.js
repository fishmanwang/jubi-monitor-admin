var express = require('express');
var router = express.Router();

var logger = require("log4js").getLogger();

/* 访问响应时间监控 */
router.use(function timeLog(req, res, next) {
    var start = Date.now();
    next();
    var end = Date.now();
    logger.debug("Time used: ", (end - start)/1000);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
