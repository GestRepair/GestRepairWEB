import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';



import { environment } from './environments/environment';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// Configurations
export const API = {
  'url': 'http://'+location.hostname,
  'port': ':8080'
};
