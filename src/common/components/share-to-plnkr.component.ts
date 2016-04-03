import {Component, Input} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Component({
    providers: [HTTP_PROVIDERS],
    selector: 'share-to-plnkr',
    template: `
    <form #form method="post" action="http://plnkr.co/edit/?p=preview" target="_blank">
        <input type="hidden" name="tags[0]" value="angularjs">
        <input type="hidden" name="tags[1]" value="example">
        <input type="hidden" name="private" value="false">
        <button (click)="onClick(form)">Submit</button>
    </form>
`
})
export class ShareToPlnkr {
    onClick(form) {
        this.http.get('./plnkr')
            .map(res => res.text())
            .subscribe(files => {
                function addHidden(theForm, key, value) {
                    // Create a hidden input element, and append it to the form:
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    theForm.appendChild(input);
                }

                const f = JSON.parse(files);

                Object.keys(f)
                    .forEach(key => {
                       addHidden(form, `files[${key}]`, f[key])
                    });

                form.submit();
            });
    }

    index =
        `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Angular 2 App</title>
                <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
                <script src="node_modules/systemjs/dist/system.js"></script>
                
            </head>
            <body>
                <app></app> 
                <script src="config.js"></script>
                <script>System.import('src/main');</script>
            </body>
            </html>`;

    constructor(private http:Http) {

    }
}