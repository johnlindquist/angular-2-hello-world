var bs = require("browser-sync").create();
var fs = require('fs');
var Rx = require('rxjs');
require('rxjs/Rx');



bs.init({
    server: "./",
    files: "index.html, src/**.**",
    middleware: function (req, res, next) {
        if (req.url === '/plnkr') {
           showFiles(req, res, next);
        }
        else{
            next();
        }

    }
});

function showFiles(req, res, next){
    var recursive = Rx.Observable.bindNodeCallback(require('recursive-readdir'));
    var readFile = Rx.Observable.bindNodeCallback(fs.readFile);

    recursive('./src')
        .map(function(files){
            return files
                .map(function(file){return file.replace(/\\/g, '/')})
                .concat(['index.html', 'config.js'])
        })
        .switchMap(function(files){return Rx.Observable.from(files)})
        .concatMap(function(file){
            return readFile(file, 'utf8')
                .map(function (contents) {
                    contents = contents.replace(/node_modules/g, 'https://npmcdn.com');
                    contents = contents.replace('<share-to-plnkr></share-to-plnkr>', '');

                    return {
                        file: file,
                        contents: contents
                    }
                });
        })
        .reduce(function(acc, curr){
            console.log(curr);
            acc[curr.file] = curr.contents;

            return acc;
        }, {})
        .subscribe(function(files){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(files));
            next();
        });
}