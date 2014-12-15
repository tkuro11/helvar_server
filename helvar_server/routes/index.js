var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.sendFile('main_console.html', {root:"./public/"});
	console.log("/console");
});

// process XML message from NEXUS
router.post('/', function(req, res) {
	var ipaddr = req.client.remoteAddress;
	var MACaddr	= req.body.lvdata['$']['MACaddr'];
	var ID = Number(req.body.lvdata.lightid);
	states.IPDICT[ipaddr] = MACaddr;
	var pulse = Number(req.body.lvdata.vitalpulse);
	var abnormalp = (pulse == 0);

	if (isNaN(ID)) {
		res.send("NOID");
		return ;
	}
	console.log(MACaddr+ ":"+ ID);

    ID = ((ID-1)%8)+1;

	// register IP - MAC assoc
	// update?

	var termno = settings.MACDICT[MACaddr];

    if (states.selected[termno] != ID) {
		var i;
		var prevflag = true;
		var prev = states.selected[termno];
		for (i = 0; i< 8; i++) {
			if (termno != i) {
			    if( prev != 0 && states.selected[i] == prev) {
					directlevel.rgb(states.selected[i], states.colors[i],100);
					states.contentionflag[states.selected[i]-1] = false;
					prevflag = false;
				} else if (states.selected[i] == ID) {
					states.contentionflag[states.selected[i]-1] = true;
					break;
				}
			}
		}

		// update!
		if (prevflag && prev != 0) {
			directlevel.rgb(prev, settings.default_color, 100);
		}
		if (i == 8) {
			directlevel.rgb(ID, states.colors[termno], 100);
		} else {
			directlevel.rgb(ID, settings.default_color, 100);
		}
		states.selected[termno] = ID;
	}
	console.log(states.contentionflag);

	var prev = states.selected[termno];
	if (states.alerts[ID-1]<0) {
		// pre-alert state. if abnormal repeated
		// 10-times, system goes to emergency-state.
		if (abnormalp) {
			states.alerts[ID-1]--;
			if (states.alerts[ID-1] <= -10) {
				states.alerts[ID-1] = 10;
			}
		} else {
			states.alerts[ID-1]++;
		}
	} else if (states.alerts[ID-1]>0) {
		// ergency-state. if abnormal happens it reset
		// counter. if normal repeated 10-times, 
		// system will calm down.
		if (abnormalp) {
			states.alerts[ID-1] = 10;
		} else {
			states.alerts[ID-1]--;
		}
	} else if (abnormalp) {
		// normal state. and some abnormal detected,
		// system goes to pre-alert-state.
		states.alerts[ID-1]--;
	}

	if (prev != ID) {
		// update!
		if (states.alerts[prev-1] > 0) {
			// in alerts situation, it will be carries 
			// to new location ... hehehe
			states.alerts[ID-1]   = states.alerts[prev-1];
			states.alerts[prev-1] = 0;
		} else {
			directlevel.rgb(prev, settings.default_color, 100);
			directlevel.rgb(ID, states.colors[termno], 100);
			states.selected[termno] = ID;
		}
	}

	res.send("OK");
});

// for initial colorvalue 
router.get('/colors', function(req, res) {
	res.send(settings.ecoselector_colors);
	console.log("colors fetched");
});

// color update request from NEXUS
router.post('/updatecolor', function(req, res) {
	console.log("/updater");
	console.log(req.body.color);
	var MACaddr = states.IPDICT[req.client.remoteAddress];
	var termno = settings.MACDICT[MACaddr];
	if (termno == undefined) {
		res.send("NO assign");
		return ;
	}
    states.colors[termno] = req.body.color;
	if (!states.contentionflag[states.selected[termno]-1]) {
		directlevel.rgb(states.selected[termno], req.body.color);
	}
    console.log("--" + states.colors + "," + req.client.remoteAddress);
    console.log(states.IPDICT);
    res.send("OK");
});

// scene changer
router.get('/scene', function (req, res) {
	if (req.query != undefined) {
		var sceneno= Number(req.query.no);
		if (1 <= sceneno && sceneno <= 16) {
			var ctable = settings.scene_colors["scene" +sceneno];
			for (var i = 0; i< ctable.length; i++) {
				directlevel.rgb(i+1, ctable[i],100);
			}
			console.log("scene changed ... in scene mode");
		} else {
			console.log("deactivate scene mode");
			for (var i = 0; i< 8; i++) {
				directlevel.rgb(i+1, settings.default_color,100);
			}
		}
	}
	console.log("/scene");
	res.render("scene", { scene: sceneno, 
		colors: JSON.stringify(settings.scene_colors)});
});

// pattern changer
router.get('/pattern', function (req, res) {
	if (req.query != undefined) {
		var patno= Number(req.query.no);
		if (!isNaN(patno)) {
			states.pattern = patno;
			console.log("pattern changed ... in pattern mode");
		} else {
			states.pattern = 0;
			console.log("deactivate pattern mode");
		}
	}
	console.log("/pattern");
	res.render("pattern", {pattern: states.pattern, handlers: states.handlers});
});

module.exports = router;
