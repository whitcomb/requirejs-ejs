/** @license
 	* RequireJS EJS Plug-in
 	* Copyright(c) 2012 Brad Whitcomb <git@bradwhitcomb.com>
 	* MIT Licensed
	* TODO: Documentation, Configuration, Filter Support, Build Support
 	*/

define(['ejs', 'text'], function (ejs, text) {
	
	"use strict";
	
	var rejs, extension;
	
	// Change this if you want to use a different template extension.
	extension = 'ejs';
	
	rejs = {
		
		version: '0.1',
		
		load: function (name, req, onLoad, config) {
			var index, url;
			index = name.indexOf('.');
			url = req.toUrl(name.substring(0, index) + "." + extension);
			text.get(url, function(template) {
				onLoad(ejs.compile(template));
			});
		}
		
	};
	
	return rejs;
	
});