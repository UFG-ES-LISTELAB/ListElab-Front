import { Component, OnInit } from '@angular/core';

import {Question} from '../../questions.model';
import {FormBuilder} from '@angular/forms';
import {QuestionsService} from '../../questions.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[] = [];
  hasError: any;

  constructor(private fb: FormBuilder,
              private questionsService: QuestionsService) {}

  ngOnInit() {
    this.questionsService.getQuestions()
      .subscribe(questions => this.questions = questions);
  }

}
