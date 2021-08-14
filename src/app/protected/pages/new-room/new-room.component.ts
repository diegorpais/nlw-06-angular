import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { FirebaseService } from 'src/app/public/services/firebase.service';

import { RootRoutes } from 'src/app/public/utils';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {

  newRoomForm = this.fb.group({
    className: ['']
  });

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  backToHome() {
    this.router.navigate([RootRoutes.HOME]);
  }

  createNewRoom() {
    const className = this.newRoomForm.get('className').value;
    this.firebaseService.createNewRoom(className);
  }

}
