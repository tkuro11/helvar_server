// required libraries
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var xmlBodyParser= require('./multipart-xml-bodyparser');

// global settings
settings = require("./readsettings");

// routes information & express object
var routes = require('./routes/index');
var app = express();

// local state informations
states = {}
states.IPDICT = {};  // IP addr -> MAC translate cache
states.selected = []; // termNo -> current location ID

states.alerts = []; // alert information
states.colors = []; // termNo -> current color setting
for (var i =0; i< 8; i++) { // initialize above 3
	states.selected.push(0);
	states.alerts.push(false);
	states.colors.push(settings.ecoselector_colors[0]);
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// body parser settings
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(xmlBodyParser());

// route assign
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
