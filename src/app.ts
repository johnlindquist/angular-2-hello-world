import {Component} from 'angular2/core';
import {Store, provideStore} from '@ngrx/store';
import {calculate, ADD, RESET} from './reducers/calculate';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';

@Component({
    providers:[provideStore({calculate})],
    selector: 'app',
    template: `
        <button (click)="add$.next(1)">+1</button>
        <button (click)="add$.next(-1)">-1</button>
        <button (click)="reset$.next()">0</button>
        {{sum | async}}
    `
})
export class App{
    sum;

    add$ = new Subject();
    reset$ = new Subject();

    constructor(store:Store){
        this.sum = store.select('calculate');

        Observable.merge(
            this.add$.map(value =>
                ({type:ADD, payload:value})
            ),
            this.reset$.map(value =>
                ({type:RESET})
            )
        ).subscribe(store.dispatch.bind(store));
    }
}