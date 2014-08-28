var express = require('express');
var router = express.Router();
var fs = require("fs");


/* GET home page. */
router.get('/', function(req, res) {
	res.sendFile(__dirname + "/main_console.html");
});

module.exports = router;
