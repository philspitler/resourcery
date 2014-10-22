var path = require('path');
var request = require('request');

module.exports = function(app, resource, platformBaseUrl) {
  //for any GET to /resources (even /resources/2)
  app.get('/'+resource+'*', function(req, res) {

    //use the platformBaseUrl and the requested URL to create the url to call for data
    var platformUrl = platformBaseUrl + req.url;

    //place call to the platform matching the same route as the browser URL
    request(platformUrl, function (error, response, body) {

      //if that all went well
      if (!error && response.statusCode == 200) {

        //render data
        res.send(body);


      }

    });
  });
};

// in case someone wants to make it look more specific to what is going on
module.exports.route = module.exports;
