var path = require('path');
var request = require('request');

module.exports = function(app, resource, platformBaseUrl, options, viewDir) {
  viewDir = viewDir || options;
  options = options || {};

  //for any GET to /resources (even /resources/2)
  app.get('/'+resource+'*', function(req, res) {

    //use the platformBaseUrl and the requested URL to create the url to call for data
    var platformUrl = platformBaseUrl + req.url;

    //place call to the platform matching the same route as the browser URL
    request(platformUrl, function (error, response, body) {

      //if that all went well
      if (!error && response.statusCode == 200) {

        //render template
        forgeTemplateName(req, function (templateName) {
          res.render(path.join(viewDir, templateName), {data:body});
        });
  

      }

    });
  });
  //setup naming conventions for resource templates
  var forgeTemplateName = function (req, callback) {
    var viewTemplate = req.url
      .replace(/\//g, '_') //changes all slashes to underscores
      .replace(/^_|_$/g, '') //remove any leading or trailing underscores
      .replace(/[0-9]+_/g, ''); //remove any ids followed by an underscore (there would be no resources_1_brands template)

      //call callback of the consuming code
      callback(viewTemplate);
  };
};


