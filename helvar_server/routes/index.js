var express = require('express');
var router = express.Router();
var directlevel = require("./directlevel");

/* GET home page. */
router.get('/', function(req, res) {
	res.sendFile('main_console.html', {root:"./public/"});
	console.log("/writed");
});

router.post('/', function(req, res) {
	var ipaddr = req.client.remoteAddress;
	var MACaddr	= req.body.lvdata['$']['MACaddr'];
	var ID = Number(req.body.lvdata.lightid);
	console.log(MACaddr);

	if (isNaN(ID)) {
		res.send("NOID");
		return ;
	}

	ID = ((ID-1)%8)+1;

	// register IP - MAC assoc
	settings.IPDICT[ipaddr] = MACaddr;

	// update?
	var termno = settings.MACDICT[MACaddr];

	if (settings.selected[termno] != ID) {
		// update!
		var prev = settings.selected[termno];
		directlevel.rgb(prev, settings.default_color);
		directlevel.rgb(ID, settings.colors[ID]);
		settings.selected[termno] = ID;
	}

	res.send("OK");
});


module.exports = router;
