import { Component, OnInit } from '@angular/core';
import {Question} from '../questions.model';
import {FormBuilder} from '@angular/forms';
import {QuestionsService} from '../questions.service';
import {LoginService} from '../../login/login.service';
import {ApiResponse} from '../../shared/models/api-response.model';
import {Router} from '@angular/router';
import {QUESTOES_CRIAR, QUESTOES_EDITAR} from '../../shared/constants/routes.contants';

const emptyQuestion: Question = {
  id: null,
  tipo: 0,
  enunciado: '',
  areaDeConhecimento: 0,
  nivelDificuldade: 0,
  tempoMaximoDeResposta: 0,
};

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
              private router: Router,
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

  onFormSubmit(searchForm) {
    this.searchQuestions(searchForm);
  }

  onQuestionNew() {
    this.questionsService.selectedQuestion = emptyQuestion;
    this.router.navigate([QUESTOES_CRIAR]);
  }

  onQuestionSelected(question: Question) {
    this.questionsService.selectedQuestion = question;
    this.router.navigate([QUESTOES_EDITAR]);
  }
}
