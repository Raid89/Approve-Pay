/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import LogRocket from 'logrocket';
LogRocket.init('mruvry/approbe');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
