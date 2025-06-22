import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    // Firebase providers
    provideFirebaseApp(() => {
      console.log('Initializing Firebase with config:', environment.firebase);
      try {
        const app = initializeApp(environment.firebase);
        console.log('Firebase initialized successfully');
        return app;
      } catch (error) {
        console.error('Failed to initialize Firebase:', error);
        throw error;
      }
    }),
    provideAuth(() => {
      console.log('Initializing Firebase Auth');
      return getAuth();
    }),
    provideStorage(() => {
      console.log('Initializing Firebase Storage');
      return getStorage();
    }),
    provideDatabase(() => {
      console.log('Initializing Firebase Realtime Database');
      return getDatabase();
    })
  ]
}; 