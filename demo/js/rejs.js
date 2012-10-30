/** @license
 	* RequireJS EJS Plug-in
 	* Copyright(c) 2012 Brad Whitcomb <git@bradwhitcomb.com>
 	* MIT Licensed
	* TODO: Documentation, Configuration, Filter Support
 	*/

define([
  
  'ejs', 
  'text'
  
  ], function (ejs, text) {
	
	"use strict";
	
	var rejs, extension, buildMap, buildTemplate;
	
	// Change this if you want to use a different template extension.
	extension = 'ejs';
  
  buildMap = {};
  
  buildTemplate = 'define("<%= pluginName %>!<%= moduleName %>", ["ejs"], function(ejs) {' +
    ' return ejs.compile(<%= template %>); }); \n';
	
	rejs = {
		
		version: '0.1',
    
    write: function (pluginName, moduleName, write) {
      if (buildMap.hasOwnProperty(moduleName)) {
        write(ejs.render(buildTemplate, {
          pluginName : pluginName,
          moduleName : moduleName,
          template : buildMap[moduleName]
        }));
      }
    },
		
		load: function (name, req, load, config) {
			var url, renderer;
			url = req.toUrl(name + "." + extension);
			text.get(url, function(template) {
        if (config.isBuild) {
            buildMap[name] = JSON.stringify(template);
        }
        renderer = ejs.compile(template);
        load(renderer);
			});
		}
	};
	
	return rejs;
	
});