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
    console.log(MACaddr+ ":"+ ID);
    states.IPDICT[ipaddr] = MACaddr;

    if (isNaN(ID)) {
	res.send("NOID");
	return ;
    }

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

router.get('/colors', function(req, res) {
    res.send(settings.ecoselector_colors);
    console.log("colors");
});

router.post('/updatecolor', function(req, res) {
    console.log("/updater");
    console.log(req.body.color);
    var MACaddr = states.IPDICT[req.client.remoteAddress];
    var termno = settings.MACDICT[MACaddr];
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
