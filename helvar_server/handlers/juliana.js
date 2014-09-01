var juliana = {
	next: function() {
			var pool=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,
			         18,19,20,21,22,23];
			  for (var i = 0; i< 8; i++) {
				  var pos = Math.floor(Math.random()*(pool.length))
				  var tgt =pool[pos];
				  pool.splice(pos,1);
				  var cols=Math.floor(Math.random()*100);
				  directlevel.raw(tgt+1, cols, 0);
			  }
		  },
	init: function() {
			  this.idx = 0; this.ctable = [];
			  for (var i = 1; i<= 8; i++) {

			  }

		  },
	ctable: undefined,
	idx: 0
};

module.exports = juliana;
