import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { StorageUtil, APP_NAME_STORAGE, RootRoutes } from 'src/app/public/utils';
import { AuthUser } from 'src/app/public/models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  isUserLoggedIn = false;
  user: AuthUser;
  loading = true;
  title = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoggedIn();
    this.getRoomInformation();
  }

  isLoggedIn() {
    this.firebaseService.isLoggedIn()
      .subscribe(
        res => {
          this.isUserLoggedIn = !!res;
          this.checkUserOnStorage();
          this.loading = false;
        },
        error => { this.loading = false; }
      );
  }

  checkUserOnStorage() {
    const dataStorage = StorageUtil.getValueFromStorage(APP_NAME_STORAGE);
    if (dataStorage) {
      this.user = dataStorage.auth;
    }
  }

  async signIn() {
    await this.firebaseService.signInWithGoogle()
      .then(() => {
        this.isUserLoggedIn = true;
        this.checkUserOnStorage();
      })
  }

  backHome() {
    this.router.navigate([RootRoutes.HOME]);
  }

  async getRoomInformation() {
    const { roomState } = window.history.state;
    const roomId = this.activatedRoute.snapshot.params['id'];

    if (!roomState) {
      const roomInfo = await this.firebaseService.getRoomInformation(roomId);
      this.title = roomInfo.title;
      return;
    }

    this.title = roomState.title;

  }

}
