import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angular2commonAppComponent, environment } from './app/';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2commonAppComponent, [disableDeprecatedForms(), provideForms()]);

