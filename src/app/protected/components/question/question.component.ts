import { Component, OnInit, Input } from '@angular/core';

import { FirebaseService } from 'src/app/public/services/firebase.service';
import { Question, AuthUser, AlertIcons } from 'src/app/public/models';
import { AlertUtil } from 'src/app/public/utils';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() parsedQuestions: Array<Question> = [];
  @Input() user: AuthUser;
  @Input() roomId: string;
  @Input() isAdmin: string;
  @Input() isRoomClosed = false;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  likeQuestion(question: Question) {
    this.firebaseService.likeQuestions(this.user, question.id, this.roomId, question.likeId);
  }

  deleteQuestion(question: Question) {
    AlertUtil.confirmAlert('Tem certeza que deseja excluir essa pergunta?', AlertIcons.QUESTION)
      .then(res => {
        if (res.isConfirmed) {
          this.firebaseService.deleteQuestion(this.roomId, question.id);
        }
      });
  }

  async highlightQuestion(question: Question) {
    // this.firebaseService.highlightQuestion(this.roomId, question.id, question.isHighLighted);
    const modalAnswer = await AlertUtil.answerAlert();

    if (modalAnswer) {
      const answer = {
        author: this.user,
        content: modalAnswer
      }
      this.firebaseService.sendAnswers(answer, this.roomId, question.id);
    }

  }

  checkQuestionAsAnswered(question: Question) {
    this.firebaseService.checkQuestionAsAnswered(this.roomId, question.id, question.isAnswered);
  }

}
