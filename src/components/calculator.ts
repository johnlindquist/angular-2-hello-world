import {Component, Output, EventEmitter, Input} from 'angular2/core';

@Component({
    selector: 'calculator',
    template: `
        <button (click)="add.emit(1)">+1</button>
        <button (click)="add.emit(-1)">-1</button>
        <button (click)="reset.emit()">Reset</button>
        {{sum}}
        `
})
export class Calculator{
    @Output() add = new EventEmitter();
    @Output() reset = new EventEmitter();
    
    @Input() sum;
}
