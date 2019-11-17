import Swal from "sweetalert2";

import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import {QuestionsService} from '../questions.service';
import {LoginService} from '../../login/login.service';
import {ListsService} from '../../lists/lists.service';

import {ApiResponse} from '../../shared/models/api-response.model';

import * as fromQuestionsModels from '../questions.model';
import * as fromRoutesConstants from '../../shared/constants/routes.contants';
import {AreaDeConhecimento} from '../../shared/models/areaDeConhecimento';
import {NivelDificuldade} from '../../shared/models/nivelDificuldade';
import {TipoQuestao} from "../../shared/models/tipoQuestao";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  areaDeConhecimento = AreaDeConhecimento;
  nivelDificuldade = NivelDificuldade;
  tipoQuestao = TipoQuestao;

  // Barra de Busca
  displayedColumns = ['tipo', 'enunciado', 'dificuldade', 'tempoMaximoDeResposta', 'menu'];

  questions: fromQuestionsModels.Question[] = [];
  hasError: any;
  isLoading: boolean;
  isListEditing: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private listsService: ListsService,
              private questionsService: QuestionsService) {
  }

  ngOnInit() {
    this.isListEditing = true;
    this.isLoading = true;
    this.onSearch();
  }

  onSearch(params?) {
    this.isLoading = true;
    this.hasError = null;
    this.questionsService.getAll()
      .subscribe((response: ApiResponse) => {
        this.questions = response.resultado;
        this.isLoading = false;
      }, error => {
        this.hasError = error;
      });
  }

  onNavQuestionNew() {
    this.questionsService.selectedQuestion = fromQuestionsModels.emptyQuestion;
    this.router.navigate([ fromRoutesConstants.QUESTOES_FORMULARIO ]);
  }

  onNavQuestionUpdate($event, question: fromQuestionsModels.Question) {
    $event.stopPropagation();
    this.questionsService.selectedQuestion = question;
    this.router.navigate([ fromRoutesConstants.QUESTOES_FORMULARIO, question.id ]);
  }

  onNavQuestionDelete($event, question: fromQuestionsModels.Question) {
    $event.stopPropagation();
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
