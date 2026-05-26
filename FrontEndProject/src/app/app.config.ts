import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  //stvari koje mozemo da injektujemo, dodamo neku metodu u niz koja kreira objekat, i kasnije samo pozovemo u konst komponente
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(), //daje objekat koji mozemo da injektujemo kada zelimo
    provideNativeDateAdapter()
  ]
};
