import { FIREBASE_KEYS } from './firebase.environment';

export const environment = {
  production: false,
  firebase: {
    apiKey: FIREBASE_KEYS.API_KEY,
    authDomain: FIREBASE_KEYS.AUTH_DOMAIN,
    databaseURL: FIREBASE_KEYS.DATABASE_URL,
    projectId: FIREBASE_KEYS.PROJECT_ID,
    storageBucket: FIREBASE_KEYS.STORAGE_BUCKET,
    messagingSenderId: FIREBASE_KEYS.MESSAGING_SENDERID,
    appId: FIREBASE_KEYS.APP_ID,
  }
};
