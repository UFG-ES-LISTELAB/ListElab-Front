import Swal from "sweetalert2";

import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import {QuestionsService} from '../questions.service';
import {LoginService} from '../../login/login.service';
import {ListsService} from '../../lists/lists.service';

import {ApiResponse} from '../../shared/models/api-response.model';

import * as fromQuestionsModels from '../questions.model';
import * as fromRoutesConstants  from '../../shared/constants/routes.contants';
import {Question} from "../questions.model";


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: fromQuestionsModels.Question[] = [];
  hasError: any;
  isLoading: boolean;
  isListEditing: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private listsService: ListsService,
              private questionsService: QuestionsService) {}

  ngOnInit() {
    this.isListEditing = true;
    this.isLoading = true;
    this.onSearch();
  }

  onSearch(params?) {
    this.isLoading = true;
    this.hasError = null;
    console.log(JSON.stringify(params));
    // {"tipoQuestao":0,"nivelDificuldade":"","tempoMaximoDeResposta":"","areaDeConhecimento":"","disciplina":""}
    if(params) {

      // let send = {};
      // if(params.tipoQuestao && params.tipoQuestao >= 0) {
      //   send = { ...send, tipoQuestao: params.tipoQuestao };
      // }

      // this.questionsService.getWithParams(send).subscribe((response: ApiResponse) => {
      //   this.questions = response.resultado;
      //   this.isLoading = false;
      // }, error => {
      //   this.hasError = error;
      // });
    } else {
      this.questionsService.getAll()
        .subscribe((response: ApiResponse) => {
          this.questions = response.resultado;
          this.isLoading = false;
        }, error => {
          this.hasError = error;
        });
    }
  }

  onQuestionNew() {
    this.questionsService.selectedQuestion = fromQuestionsModels.emptyQuestion;
    this.router.navigate([fromRoutesConstants.QUESTOES_CRIAR]);
  }

  onQuestionDetail(question: fromQuestionsModels.Question) {
    this.questionsService.selectedQuestion = question;
    this.router.navigate([fromRoutesConstants.QUESTOES_EDITAR]);
  }

  onDeleted(question: fromQuestionsModels.Question) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'A operação não poderá ser revertida!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.questionsService.delete(question.id).subscribe(response => {
          this.isLoading = false;
          this.questions = this.questions.filter(x => x.id !== question.id);
          Swal.fire(
            'Removida!',
            'Sua questão foi removida.',
            'success'
          );
        }, error => {
          this.isLoading = false;
        });
      }
    });
  }

}
