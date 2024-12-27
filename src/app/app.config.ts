import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { notesReducer } from './store/reducers';
import { NotesEffects } from './store/effects';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    
    provideStore({ notes: notesReducer }),
    provideEffects([NotesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
