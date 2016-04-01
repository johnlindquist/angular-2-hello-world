var path = require("path");
var Builder = require('systemjs-builder');
var fs = require('fs-extra');

var builder = new Builder('./', './config.js');

//clear dist
fs.removeSync('dist');

//build
builder
    .buildStatic('./build/main', './dist/main.js', {
        minify: true,
        sourceMaps: true
    })
    .then(function () {
        console.log('Build complete');
    })
    .catch(function (err) {
        console.log('Build error');
        console.log(err);
    });

//copy polyfills
fs.copy(
    './node_modules/angular2/bundles/angular2-polyfills.js',
    './dist/angular2-polyfills.js',
    function (err) {
        if (err) return console.error(err);
        console.log("copied angular2-polyfills.js to dist")
    });

//copy index template
fs.copy(
    './build/index.html',
    './dist/index.html',
    function (err) {
        if (err) return console.error(err);
        console.log("copied index.html to dist")
    });    