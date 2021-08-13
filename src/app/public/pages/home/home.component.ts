import { Component, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/public/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit(): void {
  }

  async signIn() {
    await this.firebaseService.signInWithGoogle();
    // rotear para pagina correta
  }

  signOut() {
    this.firebaseService.signOut();
  }

}
