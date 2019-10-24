import { Component, OnInit } from '@angular/core';
import {emptyQuestion, Question} from "../../questions/questions.model";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../login/login.service";
import {QuestionsService} from "../../questions/questions.service";
import {ApiResponse} from "../../shared/models/api-response.model";
import {QUESTOES_CRIAR, QUESTOES_EDITAR} from "../../shared/constants/routes.contants";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements OnInit {

  questions: Question[] = [];
  hasError: any;
  isLoading: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private questionsService: QuestionsService) {}

  ngOnInit() {
    this.isLoading = true;
    // this.searchQuestions();
  }

  // searchQuestions(params = {}) {
  //   this.isLoading = true;
  //   this.hasError = null;
  //   this.questionsService.getQuestions(params)
  //     .subscribe((response: ApiResponse) => {
  //       this.questions = response.resultado;
  //       this.isLoading = false;
  //     }, error => {
  //       this.hasError = error;
  //     });
  // }
  //
  // onFormSubmit(searchForm) {
  //   this.searchQuestions(searchForm);
  // }
  //
  // onQuestionNew() {
  //   this.questionsService.selectedQuestion = emptyQuestion;
  //   this.router.navigate([QUESTOES_CRIAR]);
  // }
  //
  // onQuestionSelected(question: Question) {
  //   this.questionsService.selectedQuestion = question;
  //   this.router.navigate([QUESTOES_EDITAR]);
  // }
  //
  // onDeleted(question: Question) {
  //   Swal.fire({
  //     title: 'Você tem certeza?',
  //     text: 'A operação não poderá ser revertida!',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sim',
  //     cancelButtonText: 'Cancelar',
  //   }).then((result) => {
  //     if (result.value) {
  //       this.isLoading = true;
  //       this.questionsService.deleteQuestion(question.id).subscribe(response => {
  //         this.isLoading = false;
  //         this.questions = this.questions.filter(x => x.id !== question.id);
  //         Swal.fire(
  //           'Removida!',
  //           'Sua questão foi removida.',
  //           'success'
  //         );
  //       }, error => {
  //         this.isLoading = false;
  //       });
  //     }
  //   });
  // }

}
