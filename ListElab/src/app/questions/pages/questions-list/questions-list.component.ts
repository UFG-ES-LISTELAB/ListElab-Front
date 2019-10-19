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
  isLoading: boolean;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private questionsService: QuestionsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.searchQuestions();
  }

  handleLogin() {
    this.loginService.login(
      { email: 'professor@ufg.br', password: 123456 })
      .subscribe(
        (x: ApiResponse) => {}, error => { this.hasError = error; });
  }

  searchQuestions(params = {}) {
    this.isLoading = true;
    this.questionsService.getQuestions(params)
      .subscribe((response: ApiResponse) => {
        this.questions = response.resultado;
        console.log(this.questions);
        this.isLoading = false;
      }, error => {
        this.hasError = error;
      });
  }

  handleSearchFormSubmition(searchForm) {
    this.searchQuestions(searchForm);
  }

}
