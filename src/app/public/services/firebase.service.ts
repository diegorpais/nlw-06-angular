import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { User } from '@firebase/auth-types';

import firebase from 'firebase/app';

import { AuthUser, Question } from 'src/app/public/models';
import { StorageUtil, AlertUtil, APP_NAME_STORAGE, RootRoutes } from 'src/app/public/utils';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private database: AngularFireDatabase,
    private router: Router
  ) { }

  signInWithGoogle(): Promise<AuthUser> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise((resolve, reject) => {

      this.auth.signInWithPopup(provider)
        .then(result => {

          if (result.user) {
            const userInfo = this.getUserInformation(result.user);
            resolve(userInfo);
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
    StorageUtil.removeValueFromStorage(APP_NAME_STORAGE);
  }

  isLoggedIn(): Observable<AuthUser> {
    const user = this.auth.authState;
    return user.pipe(
      take(1),
      map(authState => {
        if (!!authState) {
          return this.getUserInformation(authState);
        }
      })
    );
  }

  getUserInformation(firebaseUser: User) {
    const { displayName, photoURL, uid } = firebaseUser;

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

    StorageUtil.setValueToStorage(APP_NAME_STORAGE, { auth: userLogged });

    return userLogged;
  }

  async createNewRoom(newRoom: string) {

    if (!newRoom) {
      AlertUtil.errorAlert('Nome da sala é obrigatório.');
      return;
    }

    const user = StorageUtil.getValueFromStorage(APP_NAME_STORAGE);

    if (!user) {
      AlertUtil.errorAlert('É preciso realizar o login com sua conta Google para criar uma sala.');
      this.router.navigate([RootRoutes.HOME]);
      return;
    }

    const roomRef = this.database.list('rooms');
    roomRef.valueChanges();

    const room = {
      title: newRoom,
      authorId: user.auth.id
    }

    await roomRef.push(room)
      .then((res: any) => {
        this.router.navigate([`rooms/${res.key}`]);
      })
      .catch((error) => {
        console.log(error)
        AlertUtil.errorAlert('Não foi possível criar a sala com sua conta Google.')
      })


  }

  getRoomInformation(roomId: string): Observable<any> {
    const roomRef = this.database.list(`rooms/${roomId}`);
    return roomRef.snapshotChanges();
  }

  async sendQuestions(question: Question, roomId: string) {
    const roomRef = this.database.list(`rooms/${roomId}/questions`);

    return new Promise(async (resolve) => {
      await roomRef.push(question)
        .then(res => {
          resolve(res.key);
        })
        .catch(_ => {
          AlertUtil.errorAlert('Não foi possível enviar a sua pergunta.')
        })

    });
  }


}
