var timerhandler = function () {
	console.log("timer check:" + states.pattern);
	switch (states.pattern) {
		case 1:
			break;
		case 2:
			break;
		default:
			for (var i = 0; i< 8; i++) {
				if(states.alerts[i]>0) {
					console.log("alert state");
					
				}
			}
	}
}

module.exports = timerhandler;

