import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {LISTAS_LISTAR} from "../../shared/constants/routes.contants";
import {FormBuilder, FormGroup} from "@angular/forms";

import {ListsService} from "../lists.service";
import * as fromListsModels from '../../lists/lists.model';
import * as fromQuestionsModels from '../../questions/questions.model';

import {DiscursiveQuestionsService} from "../../questions/discursiveQuestions.service";
import {ApiResponse} from "../../shared/models/api-response.model";
import {List} from '../lists.model';
import {Question} from '../../questions/questions.model';



@Component({
  selector: 'app-lists-form',
  templateUrl: './lists-form.component.html',
  styleUrls: ['./lists-form.component.scss']
})
export class ListsFormComponent implements OnInit {

  isLoading: boolean = false;
  hasError = null;
  screenTitle: string;
  listForm: FormGroup;

  selectedList: List;
  selectedDiscursivas: Question[];
  questions: fromQuestionsModels.Question[];

  constructor(private fb: FormBuilder,
              private questionsService: DiscursiveQuestionsService,
              private listsService: ListsService,
              private router: Router) { }

  ngOnInit() {
    this.listsService.selectedList ?
      this.selectedList = this.listsService.selectedList
      : this.selectedList = fromListsModels.emptyList;
    this.selectedList.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';

    this.getQuestions();

    this.listForm = this.fb.group({
      id: this.selectedList.id ? this.selectedList.id : null,
      titulo: this.selectedList.titulo,
      usuario: this.selectedList.usuario ? this.selectedList.usuario : "professor@ufg.br"
    });

    this.selectedDiscursivas = this.selectedList.discursivas.length === 0 ? [] : [...this.selectedList.discursivas];
  }

  returnToList() {
    this.router.navigate([LISTAS_LISTAR]);
  }

  submit() {
    const form = this.listForm.value;

    const result = {
      titulo: form.titulo,
      nivelDificuldade: form.nivelDificuldade,
      areaDeConhecimento: {
        codigo: form.areaDeConhecimentoId
      },
      disciplina: {
        codigo: form.disciplinaId
      },
      usuario: form.usuario,
      questoesDiscursiva: [...this.selectedDiscursivas ]
    };

    if (!this.selectedList.id) {
      this.listsService.create(result).subscribe(x => console.log(x));
      this.router.navigate(['/listas']);
    } else {
      this.listsService.update(Object.assign({}, result, { id: form.id })).subscribe(x => console.log(x));
      this.router.navigate(['/listas']);
    }
  }

  getQuestions() {
    this.questionsService.getAll().subscribe((x: ApiResponse) => this.questions = x.resultado);
  }

  addQuestion(question: fromQuestionsModels.Question) {
    this.selectedDiscursivas.push(question);
  }
}
