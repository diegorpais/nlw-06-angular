import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/public/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() parsedQuestions: Array<Question> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
