var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var xmlBodyParser= require('./multipart-xml-bodyparser');

var routes = require('./routes/index');

var app = express();

settings = require("./readsettings");
settings.MACDICT = {
	"10:aa:bb:ff:85:bb": 0,
	"10:aa:bb:ff:85:cc": 1,
	"10:aa:bb:ff:85:dd": 2,
	"dummy": 3,
	"dummy": 4,
	"dummy": 5,
	"dummy": 6,
	"dummy": 7,
};
settings.IPDICT = [];
settings.selected = [];
settings.colors = [
	[93, 19, 19],
	[93, 19, 19],
	[93, 19, 19],
	[93, 19, 19],
	[93, 19, 19],
	[93, 19, 19],
	[93, 19, 19],
	[93, 19, 19]
	];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(xmlBodyParser());

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
