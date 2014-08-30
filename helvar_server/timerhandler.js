// load handlers
var knight2000 = require('./handlers/knight2000');
var juliana = require('./handlers/juliana.js');
var normal = require('./handlers/normal.js');


// state
var prev = null;
var cur  = null;

// handler turn table
var timerhandler = function () {
	switch (states.pattern) {
		case 1: // Knight 2000 mode
			cur = knight2000;
			break;
		case 2: // juliana
			cur = juliana;
			break;
		default: // emergency
			cur = normal;
			break;
	}
	if (prev!=cur) cur.init();
	cur.next();
	prev = cur;
};

module.exports = timerhandler;
