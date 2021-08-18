import { Component, OnInit, Input } from '@angular/core';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { Question, AuthUser } from 'src/app/public/models';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() parsedQuestions: Array<Question> = [];
  @Input() user: AuthUser;
  @Input() roomId: string;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  likeQuestion(question: Question) {
    this.firebaseService.likeQuestions(this.user, question.id, this.roomId, question.likeId);
  }

}
