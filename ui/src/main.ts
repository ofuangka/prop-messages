import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { PropMessagesModule } from './prop-messages/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PropMessagesModule);