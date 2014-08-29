var sock=undefined;
var dummy_diff=0;

function raw(addr, value, fade) {
    if (fade == undefined) {
        fade = 10;
    }
    fade += dummy_diff;
    dummy_diff = (dummy_diff +1) &0xf;
    var cmd = ">V:1,C:14,F:"+fade+",L:"+value+",@1.1.1."+addr +"#";

    if (!sock) {init();}
    console.log(cmd);
    sock.write(cmd);
}

function rgb(lightno, rgb, fade) {
    if (typeof(rgb) == 'string') {
        r = Math.floor(parseInt(rgb.substr(1,2),16)*100/256);
        g = Math.floor(parseInt(rgb.substr(3,2),16)*100/256);
        b = Math.floor(parseInt(rgb.substr(5,2),16)*100/256);
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

function init(addr) {
    var options = {type: "tcp4"};
    var net = require("net");
    sock = net.Socket();

    console.log("initialized");

    sock.connect(50000, addr, function() {
    });
    sock.on('data', function(data) {
        console.log("data----" + data);
    });
    sock.on('end', function(data) {
        console.log("----" + data);
    });
    sock.on('close', function(data) {
        console.log("closed...reopen" + data);
        init(addr);
    });
    sock.on('error', function(data) {
        console.log("error" + data);
    });
}


module.exports.raw = raw;
module.exports.rgb = rgb;
module.exports.init = init;

