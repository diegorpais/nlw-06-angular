import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { StorageUtil, APP_NAME_STORAGE, RootRoutes, AlertUtil } from 'src/app/public/utils';
import { AuthUser, RoomInfo } from 'src/app/public/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  loading = true;
  isUserLoggedIn = false;
  title = '';
  parsedQuestions = [];
  user: AuthUser;

  roomId: string;
  roomInfo = new RoomInfo();
  roomChanges: Subscription;

  isRoomClosed = false;

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

  ngOnDestroy() {
    if (this.roomChanges) {
      this.roomChanges.unsubscribe();
    }
  }

  isLoggedIn() {
    this.firebaseService.isLoggedIn()
      .subscribe(
        res => {
          this.isUserLoggedIn = !!res;
          this.checkUserOnStorage();

        },
        _ => { }
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

  getRoomInformation() {

    this.roomChanges = this.firebaseService.getRoomInformation(this.roomId)
      .subscribe(
        res => {

          if (!res.length) {
            AlertUtil.errorAlert('Sala não existe. Verifique se o ID esta correto.');
            this.router.navigate([RootRoutes.HOME]);
            return;
          }

          res.forEach(item => {
            this.roomInfo[item.key] = item.payload.val();
          });

          this.title = this.roomInfo.title;

          console.log('Observable: ', this.roomInfo);

          if (this.roomInfo.questions) {
            this.parsedQuestions = Object.entries(this.roomInfo.questions).map(([key, value]) => {
              return {
                id: key,
                content: value.content,
                author: value.author,
                isHighLighted: value.isHighLighted,
                isAnswered: value.isAnswered,
                likeCount: Object.values(value.likes ? value.likes : {}).length,
                likeId: Object.entries(value.likes ? value.likes : {}).find((like: any) => like[1]?.authorId === this.user?.id)?.[0]
              }
            });

            this.parsedQuestions.reverse();
          }

          console.log('Questions: ', this.parsedQuestions);
          this.loading = false;

          if (this.roomInfo.endedAt) {
            this.isRoomClosed = true;
            this.roomForm.get('question').disable();
          }

        },
        _ => {
          AlertUtil.errorAlert('Erro ao tentar obter informações da sala.');
          this.router.navigate([RootRoutes.HOME]);
          this.loading = false;
        }
      );
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
