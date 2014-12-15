var fs = require('fs');
// load handlers

var handlers_path = "./handlers/";

fs.readdir(handlers_path, function (err, list) { 
	states.handlers = list.filter(function(fname) { return /\.js$/.test(fname) && fname != "normal.js"; });
	states.handlers = states.handlers.map(function(fname){ return [fname.slice(0, -3), require(handlers_path + fname)] });
	states.handlers.unshift(["normal", require(handlers_path + "normal.js")]);
	console.log(states.handlers);
});

fs.watch(handlers_path, function(err, name) {
	process.exit(0);
});

// state
var prev = null;
var cur  = null;

// handler turn table
var timerhandler = function () {
	if (0 < states.pattern && states.pattern < states.handlers.length) {
		cur = states.handlers[states.pattern][1];
	} else {
		cur = states.handlers[0][1];
	}
	if (prev!=cur) cur.init();
	cur.next();
	prev = cur;
};

module.exports = timerhandler;
