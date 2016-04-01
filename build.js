var path = require("path");
var Builder = require('systemjs-builder');

var builder = new Builder('./', './config.js');

builder
    .buildStatic('./src/main.dist', './dist/main.js', {
        minify: true, 
        sourceMaps: true 
        })
    .then(function() {
    console.log('Build complete');
    })
    .catch(function(err) {
    console.log('Build error');
    console.log(err);
    });



var fs = require('fs-extra')
fs.copy(
    './node_modules/angular2/bundles/angular2-polyfills.js', 
    './dist/angular2-polyfills.js', 
    function (err) {
        if (err) return console.error(err)
        console.log("copied angular2-polyfills.js to dist")
    });
    
fs.copy(
    './index.dist.html', 
    './dist/index.html', 
    function (err) {
        if (err) return console.error(err)
        console.log("copied index.html to dist")
    });    