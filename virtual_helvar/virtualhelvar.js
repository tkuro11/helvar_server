var net = require("net");
var express = require("express");

var app = express();

app.use("/public", express.static(__dirname+"/public"));

var colortable= [];
for (var i = 0; i<8; i++) {
	colortable.push(100,100,100);
}

net.createServer(function (c) {
	c.on('data', function(data) {
		var cmds = data.toString().trim().split('#');
		for (var i = 0; i< cmds.length-1; i++) {
		    var s = cmds[i].split(',');
			if (s.length != 5) return;
			var t = s[4].substr(2),
				intencity = Number(s[3].substr(2));
			var target = Number(t.split(".")[3])-1;

			colortable[target] = intencity;
		}
	});
	c.on('end', function() {
		console.log('server end');
	});	
	c.write('hello\n');
}).listen(50000);

app.get('/', function (req, res) {
		res.sendFile("table.html", {root: "./public"});
});

app.get('/check', function (req, res) {
		res.end(colortable.toString());
});

app.listen(3000);
