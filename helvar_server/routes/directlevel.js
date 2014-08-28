var sock=undefined;

function raw(addr, value, fade) {
	if (fade == undefined) {
		fade = 10;
	}
    var cmd = ">V:1,C:14,F:"+fade+",L:"+value+",@1.1.1."+addr +"#";

    if (!sock) {init();}
    console.log(cmd);
    sock.write(cmd);
}

function rgb(lightno, rgb, fade) {
	if (typeof(rgb) == 'string') {
		r = parseInt(rgb.substr(1,2),16)*100/256;
		g = parseInt(rgb.substr(3,2),16)*100/256;
		b = parseInt(rgb.substr(5,2),16)*100/256;
	} else {
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
	}
	console.log(r);
	console.log(g);
	console.log(b);
    var addr = (lightno-1)*3;
    raw(addr+1, r, fade);
    raw(addr+2, g, fade);
    raw(addr+3, b, fade);
};

function init() {
    var options = {type: "tcp4"};
    var net = require("net");
    sock = net.Socket();

    console.log("initialized");

    //sock.connect(50000, "10.254.1.1", function() {
    sock.connect(50000, "localhost", function() {
    });
    sock.on('data', function(data) {
        console.log("data----" + data);
    });
    sock.on('end', function(data) {
        console.log("----" + data);
    });
    sock.on('close', function(data) {
        console.log("closed" + data);
    });
    sock.on('error', function(data) {
        console.log("error" + data);
    });
}

init();


module.exports.raw = raw;
module.exports.rgb = rgb;

