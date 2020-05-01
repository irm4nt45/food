import {enableProdMode} from '@angular/core';

import {environment} from './environments/environment';

if (environment.production) {
  try {
  enableProdMode();
} catch(exception) {
  console.error('BUGFIX: calling isDevMode() in imports before enableProdMode() throws exception - https://github.com//issues/8340#\n', exception);
}
}


export {AppServerModule} from './app/app.server.module';
