var request = require('request');
var express = require('express');
var router = express.Router();

module.exports = {
	proxy: function(options) {
		router.use(function(req, res) {
			console.log(req);
			var reqPath = req.originalUrl.split('/');

			reqPath.splice(1, 1);
			options.method = req.method;
			options.url = reqPath.join('/');

			//place call to the platform matching the same route as the browser URL
			request(options, function(error, response, body) {
				//if that all went well
				if (!error) {
					res.json(JSON.parse(body));
				} else {
					console.log(error);
				}
			});
		});
		return router;
	}
};

// module.exports = router;
