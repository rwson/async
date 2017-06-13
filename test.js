const waterfall = require("./lib/waterfall");

waterfall([
	function(cb) {
		console.log(new Date);
		setTimeout(function() {
			cb(null, 123);
		}, 2000);
	},
	function(arg, cb) {
		console.log(new Date);
		setTimeout(function() {
			console.log(arg);
			cb(null, 123, 456);
		}, 2000);
	},
	function(arg1, arg2, cb) {
		console.log(new Date);
		console.log(arg1, arg2);
	}
], function() {});
