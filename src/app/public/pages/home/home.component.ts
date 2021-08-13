import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { StorageUtil, APP_NAME_STORAGE, RootRoutes } from 'src/app/public/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async signIn() {
    const user = this.lookingForUserInStorage();
    if (!user) {
      await this.firebaseService.signInWithGoogle();
    }
    this.goToNewRoom();
  }

  signOut() {
    this.firebaseService.signOut();
  }

  goToNewRoom() {
    this.router.navigate([RootRoutes.ROOMS_NEW]);
  }

  lookingForUserInStorage() {
    const user = StorageUtil.getValueFromStorage(APP_NAME_STORAGE);
    return user;
  }

}
