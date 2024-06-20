import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'
import { LOCALE_ID } from '@angular/core';

registerLocaleData(fr.default)

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: LOCALE_ID, useValue: 'fr-FR' },

    JwtHelperService,
    CookieService
  ]
})
.catch(err => console.error(err));
