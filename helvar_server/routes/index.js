var express = require('express');
var router = express.Router();
var directlevel = require("./directlevel");

// init directlevel library
directlevel.init(settings.router_address);
// all of lights to default color
for (var i =0; i< 8; i++) {
	directlevel.rgb(i+1, settings.default_color);
}

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
	// update!
	var prev = states.selected[termno];
	directlevel.rgb(prev, settings.default_color, 100);
	directlevel.rgb(ID, states.colors[termno], 100);
	states.selected[termno] = ID;
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
    directlevel.rgb(states.selected[termno], req.body.color);
    console.log("--" + states.colors + "," + req.client.remoteAddress);
    console.log(states.IPDICT);
    res.send("OK");
});

router.get('/scene', function (req, res) {
	console.log("/scene");
});

router.get('/scene', function (req, res) {
	console.log("/scene");
});

module.exports = router;
