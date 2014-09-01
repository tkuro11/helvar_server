var knight2000 = {
	next: function() {
			  for (var i = 1; i<= 4; i++) {
				  var c = this.colors[i-1];
				  if (i == this.idx) {
					  c = 100;
				  } else {
					  c /= 2;
				  }
				  directlevel.raw(i*3-2, c,20);
				  directlevel.raw(i*3-2+12, c,20);
		//		  directlevel.rgb(i+4, [c,0,0],20);
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

module.exports = knight2000;
