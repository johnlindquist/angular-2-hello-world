import {Component, Input, ViewChild} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Component({
    providers: [HTTP_PROVIDERS],
    selector: 'share-to-plnkr',
    template: `
    <form #form method="post" action="http://plnkr.co/edit/?p=preview" target="_blank">
        <input type="hidden" name="tags[0]" value="Angular 2">        
        <input type="hidden" name="tags[1]" value="egghead.io workshop">        
        <input type="hidden" *ngFor="#f of files" name="files[{{f.file}}]" value="{{f.contents}}">
        <div>//Posts to plunkr, converts all node_modules refs to unpkg</div>
        <button (click)="onClick(form)">Post Current to Plnkr</button>
    </form>
`
})
export class ShareToPlnkr {
    files;
    onClick(form) {
        this.http.get('./plnkr')
            .map(res => res.text())
            .subscribe(files => {
                const f = JSON.parse(files);

                this.files = Object.keys(f)
                    .map(key => ({
                        file:key,
                        contents: f[key]
                    }));

                //this is avoiding a bunch of fancy `ngAfterViewChecked calls/logic`
                setTimeout(()=> form.submit(), 1000);
            });
    }

    constructor(private http:Http) {

    }
}