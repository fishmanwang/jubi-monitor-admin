var express = require('express');
var common = require("../common")
var router = express.Router();

var db = require('../service/mysql_pool')

router.get("/admin",function(req, res, next) {
   res.render('user');
});

/* GET users listing. */
router.get('/query', function(req, res, next) {
    //console.log(req.query);
    var page = req.query.page;
    page = page ? page : 1;
    var limit = 20;
    var start = (page-1) * limit;
    var offset = (page) * limit;
    var sql = 'SELECT u.id id, u.username, a.nickname nickname, a.phone phone, a.email email, ' +
        'u.last_login_time lastLoginTime FROM zx_user u LEFT JOIN zx_account a ON u.id = a.user_id ' +
        'ORDER BY u.last_login_time DESC LIMIT ?, ?';

    db.query(sql, [start, offset], function(rows) {
        var ds = common.transferData(rows);
        res.json(common.ok(ds));
    });
});

module.exports = router;
