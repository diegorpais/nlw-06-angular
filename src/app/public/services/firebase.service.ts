import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';

import { AuthUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public auth: AngularFireAuth
  ) { }

  signInWithGoogle(): Promise<AuthUser> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise((resolve, reject) => {

      this.auth.signInWithPopup(provider)
        .then(result => {

          if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
              window.alert('Faltam informações da sua conta no Google.');
              this.signOut();
              return;
            }

            const userLogged = {
              id: uid,
              name: displayName,
              avatar: photoURL
            }

            resolve(userLogged);

          }

        })
        .catch(error => {
          reject(error);
        })

    });

  }

  signOut() {
    this.auth.signOut();
  }

}
