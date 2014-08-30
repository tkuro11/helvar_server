var juliana = {
	next: function() {
			  for (var i = 0; i< 8; i++) {
				  directlevel.rgb(i+1, this.ctable[this.idx][i], 50)
			  }
			  this.idx = (this.idx + 1) % 3;
		  },
	init: function() {
			  this.idx = 0; this.ctable = [];
			  for (var rgb = 0; rgb< 3; rgb++) {
				  var cs = [];
				  for (var i = 1; i<= 8; i++) {
					  var c;
					  var cols=[Math.floor(Math.random()*70),
							    Math.floor(Math.random()*70)];
					  switch(rgb) {
						  case 0: c = [ 100, cols[0], cols[1] ]; break;
						  case 1: c = [ cols[0], 100, cols[1] ]; break;
						  case 2: c = [ cols[0], cols[1], 100 ]; break;
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

module.exports = juliana;
