import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {App} from '../src/app';

enableProdMode();

bootstrap(App)
    .catch(console.log.bind(console));