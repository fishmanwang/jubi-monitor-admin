var express = require("express");
//var querystring = require('querystring')
var request = require('request');
var router = express.Router();
// var db = require('../service/mysql_pool')

router.get("/login", function (req, res, next) {
    if (req.session.user) {
        res.render("index")
        return;
    }
    res.render("login")
});

router.post("/login", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        username: username,
        password: password
    };

    request.post({url: 'http://localhost/web/login', form: data}, function(err, resp, body) {
        if (resp.statusCode != 200) {
            console.log('请求系统异常');
            return;
        }
        if (err) {
            console.log(err);
            return;
        }
        data = JSON.parse(body);
        if (data.status == 200) {
            req.session.user = username
        }
        res.json(data)
    });

    // data = querystring.stringify(data);
    // var opt = {
    //     method: 'POST',
    //     host: 'localhost',
    //     port: '80',
    //     path: '/web/login',
    //     headers: {
    //         "Content-Type": 'application/x-www-form-urlencoded',
    //         'Content-Length': Buffer.byteLength(data)
    //     }
    // };
    //
    // var hr = http.request(opt, function(callback) {
    //     if (callback.statusCode != 200) {
    //         console.log('系统异常');
    //         return;
    //     } else {
    //         var body = '';
    //         callback.on('data', function(data) {
    //             body += data
    //         }).on("end", function() {
    //             console.log(body);
    //             res.json(JSON.parse(body));
    //         })
    //     }
    // });
    //
    // hr.write(data);
    // hr.end()
});

router.get("/logout", function(req, res, next) {
    req.session.user = null
    res.render("login")
});

module.exports = router