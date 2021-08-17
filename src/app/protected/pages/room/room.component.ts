import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { StorageUtil, APP_NAME_STORAGE, RootRoutes, AlertUtil } from 'src/app/public/utils';
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
  roomId: string;

  roomForm = this.fb.group({
    question: ['']
  });

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.params['id'];
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

    if (!roomState) {
      const roomInfo = await this.firebaseService.getRoomInformation(this.roomId);
      this.title = roomInfo.title;
      return;
    }

    this.title = roomState.title;

  }


  sendQuestion() {
    const newQuestion = this.roomForm.get('question').value;

    if (newQuestion.trim() === '') {
      return;
    }

    if (!this.isUserLoggedIn) {
      AlertUtil.errorAlert('Você precisa estar logado para enviar uma pergunta.');
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: this.user.name,
        avatar: this.user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    };

    const questionSent = this.firebaseService.sendQuestions(question, this.roomId);

    if (questionSent) {
      this.roomForm.get('question').setValue('');
    }

  }

}
