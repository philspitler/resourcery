var path = require('path');
var request = require('request');

module.exports = function(app, resource) {

  //setup public folder for any assets
  app.use(require('express')['static'](path.join(__dirname, 'public')));

  //for any GET to /resources (even /resources/2)
  app.get('/'+resource+'*', function(req, res) {

    //setup convention for template names
    var viewTemplate = req.url
    .replace(/\//g, '_') //changes all slashes to underscores
    .replace(/^_|_$/g, '') //remove any leading or trailing underscores
    .replace(/[0-9]+_/g, ''); //remove any ids followed by an underscore (there would be no resources_1_brands template)

    var platformUrl = 'http://' + app.config['platform'] + '/api' + req.url;
    
    //place call to the platform matching the same route as the browser URL
    request(platformUrl, function (error, response, body) {

      //if that all went well
      if (!error && response.statusCode == 200) {

        //render the template using the template name formed above
        res.render(path.join(__dirname, viewTemplate), {data:body});
      }

    });
  });
};
