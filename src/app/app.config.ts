import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { CoursesEffects } from './store/courses/courses.effects';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { createTranslateLoader } from './services/translate-loader/translate-loader.service';
import { CustomRouteReuseStrategy } from './shared/strategies/custom-route-reuse-strategy';
import { AuthInterceptor } from './services/authentication/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      StoreModule.forRoot(reducers),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      }),
      EffectsModule.forRoot([AuthEffects, CoursesEffects])
    ),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
