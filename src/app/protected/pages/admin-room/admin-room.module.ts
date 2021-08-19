import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoadingModule } from 'src/app/public/components/loading/loading.module';
import { RoomCodeModule } from 'src/app/protected/components/room-code/room-code.module';
import { QuestionModule } from 'src/app/protected/components/question/question.module';

import { AdminRoomComponent } from './admin-room.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRoomComponent
  }
];

@NgModule({
  declarations: [AdminRoomComponent],
  imports: [
    CommonModule,
    LoadingModule,
    RoomCodeModule,
    QuestionModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoomModule { }
