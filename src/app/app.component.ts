import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/public/services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebaseService.isLoggedIn().subscribe();
  }



}
