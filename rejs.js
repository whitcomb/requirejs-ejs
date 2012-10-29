define(['ejs', 'text'], function (ejs, text) {
	
	"use strict";
	
	var rejs, extension, buildMap;
	
	// Change this if you want to use a different template extension.
	extension = 'ejs';
	
	buildMap = [];
	
	rejs = {
		
		version: '0.1',
		
		load: function (name, req, onLoad, config) {
			var index, url, template;
			index = name.indexOf('.');
			url = req.toUrl(name.substring(0, index) + "." + extension);
			text.get(url, function(text) {
				template = ejs.compile(text);
				if (config.isBuild) {
					buildMap[name] = template;
				}
				onLoad(template);
			});
		},
		
		write: function (pluginName, moduleName, write) {
			if (moduleName in buildMap) {
			var text = jsEscape(buildMap[moduleName]);
			write("define('" + pluginName + "!" + moduleName  +
				"', function () { return '" + text + "';});\n");
			}
		}
		
	};
	
	return rejs;
	
});