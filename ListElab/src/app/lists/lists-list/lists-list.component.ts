import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

import {ListsService} from "../lists.service";
import {LoginService} from "../../login/login.service";
import {ApiResponse} from "../../shared/models/api-response.model";

import * as fromRoutesConstants from "../../shared/constants/routes.contants";
import * as fromListsModels from "../lists.model";
import {LISTAS_EDITAR} from "../../shared/constants/routes.contants";

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements OnInit {

  lists: fromListsModels.List[] = [];
  hasError: any;
  isLoading: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private listsService: ListsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getLists();
  }

  getLists() {
    this.isLoading = true;
    this.hasError = null;
    this.listsService.getAll().subscribe((response: ApiResponse) => {
      this.lists = response.resultado;
      this.isLoading = false;
    }, error => {
      this.hasError = error;
    });
  }

  onListNew() {
    this.listsService.selectedList = fromListsModels.emptyList;
    this.router.navigate([fromRoutesConstants.LISTAS_CRIAR]);
  }

  onListSelected(list: fromListsModels.List) {
    this.listsService.selectedList = list;
    this.router.navigate([LISTAS_EDITAR]);
  }

  // onFormSubmit(searchForm) {
  //   this.searchQuestions(searchForm);
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
