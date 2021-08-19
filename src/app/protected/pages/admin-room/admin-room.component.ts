import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlertIcons, AuthUser, RoomInfo } from 'src/app/public/models';
import { FirebaseService } from 'src/app/public/services/firebase.service';
import { AlertUtil, APP_NAME_STORAGE, RootRoutes, StorageUtil } from 'src/app/public/utils';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.scss']
})
export class AdminRoomComponent implements OnInit, OnDestroy {

  loading = true;
  title = '';
  parsedQuestions = [];
  user: AuthUser;

  roomId: string;
  roomInfo = new RoomInfo();
  roomChanges: Subscription;

  isRoomClosed = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.params['id'];
    this.checkUserOnStorage();
    this.getRoomInformation();
  }

  ngOnDestroy() {
    if (this.roomChanges) {
      this.roomChanges.unsubscribe();
    }
  }

  checkUserOnStorage() {
    const dataStorage = StorageUtil.getValueFromStorage(APP_NAME_STORAGE);
    if (dataStorage) {
      this.user = dataStorage.auth;
    }
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
          }

        },
        _ => {
          AlertUtil.errorAlert('Erro ao tentar obter informações da sala.');
          this.router.navigate([RootRoutes.HOME]);
          this.loading = false;
        }
      );
  }

  endRoom() {
    AlertUtil.confirmAlert('Tem certeza que deseja encerrar a sala?', AlertIcons.QUESTION)
      .then(res => {
        if (res.isConfirmed) {
          this.firebaseService.endRoom(this.roomId);
        }
      });
  }

}
