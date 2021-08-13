import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';

import { AuthUser } from 'src/app/public/models';
import { StorageUtil, AlertUtil } from 'src/app/public/utils';

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
              AlertUtil.errorAlert('Faltam informações da sua conta no Google.')
              this.signOut();
              return;
            }

            const userLogged = {
              id: uid,
              name: displayName,
              avatar: photoURL
            }

            StorageUtil.setValueToStorage('@LETMEASK', { auth: userLogged });
            resolve(userLogged);
          }

        })
        .catch(error => {
          reject(error);
          AlertUtil.errorAlert('Não foi possível realizar o login na sua conta Google.')
        })

    });

  }

  signOut() {
    this.auth.signOut();
    StorageUtil.removeValueFromStorage('@LETMEASK');
  }

}
