import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {LISTAS_LISTAR, QUESTOES_LISTAR} from "../../shared/constants/routes.contants";



@Component({
  selector: 'app-lists-form',
  templateUrl: './lists-form.component.html',
  styleUrls: ['./lists-form.component.scss']
})
export class ListsFormComponent implements OnInit {

  isLoading: boolean;
  hasError: boolean;
  screenTitle: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  returnToList() {
    this.router.navigate([LISTAS_LISTAR]);
  }
}
