import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { UNIVERSAL_LOCAL_STORAGE } from '@ng-web-apis/universal';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: UNIVERSAL_LOCAL_STORAGE, useValue: {} },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
