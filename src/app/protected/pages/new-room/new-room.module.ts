import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NewRoomComponent } from './new-room.component';

const routes: Routes = [
  {
    path: '',
    component: NewRoomComponent
  }
];

@NgModule({
  declarations: [NewRoomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class NewRoomModule { }
