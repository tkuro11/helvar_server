var normal = {
	toggle_color: ["#f04040", "#804020"],
	next: function() {
			  for (var pos =0; pos< 8; pos++) {
				  if (states.alerts[pos] > 0) {
					  //directlevel.rgb(pos+1, this.toggle_color[this.idx], 100);
					  this.idx = 1-this.idx;
					  states.alerts[pos]--;
					  if (states.alerts[pos] == 0) {
						  /*if (states.contentionflag[pos]) {
							  directlevel.rgb(pos+1, settings.default_color, 40);
						  } else {*/
							  for (var i = 0; i< 8; i++) {
								  if (states.selected[i] == pos+1 ) {
									  //directlevel.rgb(pos+1, states.colors[i], 100);
									  break;
								  }
							  }
						  //}
					  }
				  } 
			  }
		  },
	init: function() {
			  this.idx = 0;
			  for (var i = 1; i<= 8; i++) {
				  directlevel.rgb(i, settings.default_color);
			  }
		  },
	idx: 0 
};

module.exports = normal;
