import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

import {ListsService} from "../lists.service";
import {LoginService} from "../../login/login.service";
import {ApiResponse} from "../../shared/models/api-response.model";

import * as fromRoutesConstants from "../../shared/constants/routes.contants";
import * as fromListsModels from "../lists.model";


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

  onSearch(searchForm) {

  }

  onNew() {
    this.listsService.selectedList = fromListsModels.emptyList;
    this.router.navigate([fromRoutesConstants.LISTAS_CRIAR]);
  }

  onSelected(list: fromListsModels.List) {
    this.listsService.selectedList = list;
    this.router.navigate([fromRoutesConstants.LISTAS_EDITAR]);
  }

  onRemoved(list: fromListsModels.List) {

  }

}
