import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoadingModule } from 'src/app/public/components/loading/loading.module';
import { RoomCodeModule } from 'src/app/protected/components/room-code/room-code.module';
import { QuestionModule } from 'src/app/protected/components/question/question.module';

import { RoomComponent } from './room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent
  }
];

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    RoomCodeModule,
    ReactiveFormsModule,
    LoadingModule,
    QuestionModule,
    RouterModule.forChild(routes)
  ]
})
export class RoomModule { }
