require(["rejs!templates/demo.ejs"], function(template) {
	console.log(template({ text: 'Hello World' }));
});
