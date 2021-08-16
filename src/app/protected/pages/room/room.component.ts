import { Component, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { StorageUtil, APP_NAME_STORAGE } from 'src/app/public/utils';
import { AuthUser } from 'src/app/public/models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  isUserLoggedIn = false;
  user: AuthUser;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.checkUserOnStorage();
    this.isLoggedIn()
  }

  isLoggedIn() {
    this.firebaseService.isLoggedIn()
      .subscribe(res => {
        this.isUserLoggedIn = !!res;
      });
  }

  checkUserOnStorage() {
    const dataStorage = StorageUtil.getValueFromStorage(APP_NAME_STORAGE);
    if (dataStorage) {
      this.user = dataStorage.auth;
    }
  }

}
