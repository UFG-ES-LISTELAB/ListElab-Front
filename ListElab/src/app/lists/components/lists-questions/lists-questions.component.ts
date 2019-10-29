import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LISTAS_EDITAR} from "../../../shared/constants/routes.contants";

@Component({
  selector: 'app-lists-questions',
  templateUrl: './lists-questions.component.html',
  styleUrls: ['./lists-questions.component.scss']
})
export class ListsQuestionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToList() {
    this.router.navigate([LISTAS_EDITAR]);
  }
}
