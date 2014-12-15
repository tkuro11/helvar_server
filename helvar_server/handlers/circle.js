var vital = {
	pat: 10,
	next: function() {
		this.idx++;
		if (this.idx > 7) {
			this.idx=0;
			this.diff++;
			if (this.diff >2) {
				this.diff = 0;
			}
			this.pat = Math.floor(Math.random()*100);
		}

		directlevel.raw(this.idx*3+this.diff+1, this.pat,100);
		//this.prev = this.idx*3+ this.diff +1;

		  },
	init: function() {
			  this.idx = 1;
			  this.diff = 0;
			  for (var i = 1; i<= 8; i++) {
				  directlevel.rgb(i, [90,90,90]);
			  }
		  },
	diff: 0,
	idx: 1
};

module.exports = vital;
