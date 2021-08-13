import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class RoomModule { }
