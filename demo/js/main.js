require(["rejs!templates/demo"], function(template) {
	console.log(template({ text: 'Hello World' }));
});
