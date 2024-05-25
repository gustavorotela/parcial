import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"parcial-rotelagustavo","appId":"1:732777896176:web:c43b2f223e7a4d257e4a35","storageBucket":"parcial-rotelagustavo.appspot.com","apiKey":"AIzaSyDlUjJ-AADdj8611ipikn4UXf5mV0zJ6Co","authDomain":"parcial-rotelagustavo.firebaseapp.com","messagingSenderId":"732777896176"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
