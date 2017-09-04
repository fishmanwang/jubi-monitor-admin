var express = require("express");
var router = express.Router();
var db = require('../service/mysql_pool')

router.get("/login", function (req, res, next) {
    res.render("login")
});

router.post("/login", function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    db.query('select * from zx_user where username = ?', [username], function (err, rows) {
        if (!rows) {
            res.json({succ: false, message: '用户名/密码错误'});
            return;
        }
        console.log(rows);
    })
});

module.exports = router