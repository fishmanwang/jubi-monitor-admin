var express = require('express');
var router = express.Router();

var mysql = require('../service/mysql_pool')

/* GET users listing. */
router.get('/query', function(req, res, next) {
    //console.log(req.query);

});

module.exports = router;
