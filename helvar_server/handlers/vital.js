var vital = {
	next: function() {
			  if (this.idx == 1) {
				  directlevel.rgb(6  , [100,0,0],50);
				  this.idx = 0;
			  } else {
				  directlevel.rgb(6, [0,0,0],50);
				  this.idx = 1;
			  }
		  },
	init: function() {
			  this.idx = 1;
			  for (var i = 1; i<= 8; i++) {
				  directlevel.rgb(i, [90,90,90]);
			  }
		  },
	idx: 1
};

module.exports = vital;
