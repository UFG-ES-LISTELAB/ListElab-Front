import { Component, OnInit } from '@angular/core';

import {Question} from '../../questions.model';
import {FormBuilder} from '@angular/forms';
import {QuestionsService} from '../../questions.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[] = [];
  hasError: any;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private questionsService: QuestionsService) {}

  ngOnInit() {
    this.questionsService.getQuestions()
      .subscribe(questions => this.questions = questions);
  }

  handleLogin() {
    this.loginService.login({ email: 'professor@ufg.br', password: 123456 }).subscribe(x => {
      console.log(x);
    });
  }
}
