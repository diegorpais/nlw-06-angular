import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RoomCodeModule } from 'src/app/protected/components/room-code/room-code.module';

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
    RouterModule.forChild(routes)
  ]
})
export class RoomModule { }
