var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var xmlBodyParser= require('./multipart-xml-bodyparser');
var routes = require('./routes/index');

var app = express();

settings = require("./readsettings");

states = {} // current state 
states.IPDICT = {};
states.selected = [];
states.alerts = [
    false,  // term0
    false,  // term1
    false,  // term2
    false,  // term3
    false,  // term4
    false,  // term5
    false,  // term6
    false  // term7
	];
states.colors = [
    "#f03030",  // term0
    "#f03030",  // term1
    "#f03030",  // term2
    "#f03030",  // term3
    "#f03030",  // term4
    "#f03030",  // term5
    "#f03030",  // term6
    "#f03030",  // term7
	];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser());
//app.use(bodyParser.json());
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
