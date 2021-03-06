var express = require('express');
var session = require('express-session');
var path = require('path');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require("ejs");

var app = express()
app.use(session({
    secret: 'coin monitor admin',
    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间
    resave: false,
    saveUninitialized: true
}));

var index = require('./routes/index');
var auth = require('./routes/auth')
var users = require('./routes/users');


app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.__express);
app.set("view engine", 'html')

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  //添加json解析器
app.use(cookieParser());
app.use('/static', express.static('static'));

var logger = log4js.getLogger();
logger.level = 'debug';

// app.use(function(req, res, next) {
//     if (req.url.startsWith("/auth/login")) {
//         next();
//         return;
//     }
//     if (!req.session.user) {
//         res.render('login')
//         return;
//     }
//     next()
// });

app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('404');
});

app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);
        res.render('error');
    } else {
        next()
    }
});

var server = app.listen(3003, function() {
    var host = server.address().address;
    var port = server.address().port;

    logger.debug('Example app listening at http://%s:%s', host, port)
});