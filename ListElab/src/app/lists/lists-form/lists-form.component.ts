import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {LISTAS_LISTAR, QUESTOES_LISTAR} from "../../shared/constants/routes.contants";
import {FormBuilder, FormGroup} from "@angular/forms";



@Component({
  selector: 'app-lists-form',
  templateUrl: './lists-form.component.html',
  styleUrls: ['./lists-form.component.scss']
})
export class ListsFormComponent implements OnInit {

  isLoading: boolean;
  hasError: boolean;
  screenTitle: string;

  listForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.listForm = this.fb.group({});
  }

  returnToList() {
    this.router.navigate([LISTAS_LISTAR]);
  }

  submit() {
    console.log(this.listForm.value);
  }
}
