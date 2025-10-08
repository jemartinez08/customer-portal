import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import {
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
} from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Client ID:
// Production: a6910611-37cd-4b01-bc6b-70802d75a167
// Local: 7d66c9b1-dd71-4520-a747-1064728e6be9
// URI
// https://orange-mud-08c19b51e.2.azurestaticapps.net
// http://localhost:4200

function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: ' a6910611-37cd-4b01-bc6b-70802d75a167',
      authority:
        'https://login.microsoftonline.com/7f0478e2-05c5-419a-873b-b8cdf0069fd4',
      redirectUri: 'https://orange-mud-08c19b51e.2.azurestaticapps.net',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false,
    },
  });
}

function MSALGuardConfigFactory() {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: '/login-failed',
  };
}

function MSALInterceptorConfigFactory() {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
  ]);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    provideHttpClient(),
  ],
};
