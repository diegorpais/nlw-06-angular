import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RootRoutes } from 'src/app/public/utils';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  backToHome() {
    this.router.navigate([RootRoutes.HOME]);
  }

}
