var knight2000 = {
	next: function() {
			  for (var i = 1; i<= 4; i++) {
				  var c = this.colors[i-1];
				  if (i == this.idx) {
					  c = 100;
				  } else {
					  c /= 2;
				  }
				  directlevel.rgb(i  , [c,0,0],50);
				  directlevel.rgb(i+4, [c,0,0],50);
				  this.colors[i-1] = c;
			  }
			  this.idx += this.dir;
			  if (this.idx == 1 || this.idx == 4) this.dir = -this.dir;
		  },
	init: function() {
			  this.dir = 1;
			  this.idx = 1;
			  for (var i = 1; i<= 8; i++) {
				  directlevel.rgb(i, [0,0,0]);
			  }
		  },
	colors: [0,0,0,0],
	dir: 1,
	idx: 1
};

var juliana = {
	next: function() {
			  for (var i = 0; i< 8; i++) {
				  directlevel.rgb(i+1, this.ctable[this.idx][i], 50)
			  }
			  this.idx = (this.idx + 1) % 3;
		  },
	init: function() {
			  this.idx = 0;

			  this.ctable = [];
			  for (var rgb = 0; rgb< 3; rgb++) {
				  var cs = [];
				  for (var i = 1; i<= 8; i++) {
					  var c;
					  var cols=[Math.floor(Math.random()*100),
								  Math.floor(Math.random()*100)]
					  switch(rgb) {
						  case 0:
							  c = [ 100, cols[0], cols[1] ];
							  break;
						  case 1:
							  c = [ cols[0], 100, cols[1] ];
							  break;
						  case 2:
							  c = [ cols[0], cols[1], 100 ];
							  break;
					  }
					  cs.push(c);
				  }
				  console.log("::"+rgb + "," +cs);
				  this.ctable.push(cs);
			  }
			  console.log(this.ctable);

		  },
	ctable: undefined,
	idx: 0
};

var normal = {
	next: function() {
		  },
	init: function() {
			  this.idx = 0;
			  for (var i = 1; i<= 8; i++) {
				  directlevel.rgb(i, settings.default_color);
			  }
		  }
};

var prev = normal;

var timerhandler = function () {
		switch (states.pattern) {
			case 1: // Knight 2000 mode
				if (prev != knight2000) {
					console.log("pattern state changed to " + states.pattern);
					knight2000.init();
				}
				knight2000.next();
				prev = knight2000;
				break;
			case 2:
				if (prev != juliana) {
					console.log("pattern state changed to " + states.pattern);
					juliana.init();
				}
				juliana.next();
				prev = juliana;
				break;
			default:
				if (prev != normal) {
					console.log("pattern state changed to " + states.pattern);
					normal.init();
				}
				for (var i = 0; i< 8; i++) {
					if(states.alerts[i]>0) {
						console.log("alert state");
						
					}
				}
				prev = normal;
		}
	};

module.exports = timerhandler;
