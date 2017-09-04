var express = require('express');
var path = require('path');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require("ejs");

var index = require('./routes/index');
var auth = require('./routes/auth')
//var user = require('./routes/user');

var app = express()

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

app.use('/', index);
app.use('/auth', auth);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = app.listen(3003, function() {
    var host = server.address().address;
    var port = server.address().port;

    logger.debug('Example app listening at http://%s:%s', host, port)
});