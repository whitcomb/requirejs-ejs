require([

    "rejs!demo/templates/one"

], function(tmplOne) {

    var data;

    data = {
        one: "this is number one",
        two: "this is number two",
        three: "this is number three"
    };

    document.querySelector('#example').innerHTML = tmplOne(data);

});