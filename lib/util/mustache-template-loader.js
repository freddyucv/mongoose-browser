var fs = require('fs');
var Mustache = require('mustache');

module.exports = function( path, context ){

    var template = fs.readFileSync(path, "utf8");
    return Mustache.render( template, context );
};