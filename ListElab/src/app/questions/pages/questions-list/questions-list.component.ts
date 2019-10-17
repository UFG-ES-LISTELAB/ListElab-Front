import { Component, OnInit } from '@angular/core';
import {Question} from '../../questions.model';
import {FormBuilder} from '@angular/forms';
import {QuestionsService} from '../../questions.service';
import {LoginService} from '../../../login/login.service';
import {ApiResponse} from '../../../shared/models/api-response.model';

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
      .subscribe((response: ApiResponse) => this.questions = response.resultado);
  }

  handleLogin() {
    this.loginService.login({ email: 'professor@ufg.br', password: 123456 }).subscribe((x: ApiResponse) => {});
  }
}
