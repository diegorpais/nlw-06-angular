import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { StorageUtil, APP_NAME_STORAGE, RootRoutes } from 'src/app/public/utils';
import { AuthUser } from 'src/app/public/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: AuthUser;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lookingForUserInStorage();
  }

  async signIn() {
    if (!this.user) {
      await this.firebaseService.signInWithGoogle();
    }
    this.goToNewRoom();
  }

  signOut() {
    this.firebaseService.signOut();
    this.user = undefined;
  }

  goToNewRoom() {
    this.router.navigate([RootRoutes.ROOMS_NEW]);
  }

  lookingForUserInStorage() {
    const storageData = StorageUtil.getValueFromStorage(APP_NAME_STORAGE);
    if (storageData) {
      this.user = storageData.auth;
    }
  }

}
