import {Component} from 'angular2/core';
import {Store, provideStore} from '@ngrx/store';
import {calculate, ADD, RESET} from './reducers/calculate';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Calculator} from './components/calculator';
import {ShareToPlnkr} from './common/components/share-to-plnkr.component';

@Component({
    providers:[provideStore({calculate})],
    selector: 'app',
    directives:[Calculator, ShareToPlnkr],
    template: `
        <calculator 
            (add)="add$.next($event)" 
            (reset)="reset$.next($event)" 
            [sum]="sum | async">        
        </calculator>
        <share-to-plnkr></share-to-plnkr>
    `
})
export class App{
    sum:Observable<number>;

    add$ = new Subject();
    reset$ = new Subject();

    sub:Subscription;

    constructor(store:Store){
        this.sum = store.select('calculate');

        this.sub = Observable.merge(
            this.add$.map(value =>
                ({type:ADD, payload:value})
            ),
            this.reset$.map(value =>
                ({type:RESET})
            )
        ).subscribe(store.dispatch.bind(store));
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}