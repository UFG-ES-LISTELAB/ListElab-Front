import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {LISTAS_LISTAR, QUESTOES_LISTAR} from "../../shared/constants/routes.contants";
import {FormBuilder, FormGroup} from "@angular/forms";

import {ListsService} from "../lists.service";
import * as fromListsModels from '../../lists/lists.model';
import * as fromQuestionsModels from '../../questions/questions.model';

import {QuestionsService} from "../../questions/questions.service";
import {ApiResponse} from "../../shared/models/api-response.model";
import {List} from '../lists.model';



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

  questions: fromQuestionsModels.Question[];
  selectedQuestions: fromQuestionsModels.Question[] = [];

  constructor(private fb: FormBuilder,
              private questionsService: QuestionsService,
              private listsService: ListsService,
              private router: Router) { }

  ngOnInit() {
    this.listsService.selectedList ?
      this.selectedList = this.listsService.selectedList
      : this.selectedList = fromListsModels.emptyList;
    this.selectedList.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';

    this.listForm = this.fb.group({
      id: null,
      titulo: '',
      descricao: '',
      nivelDificuldade: null,
      areaDeConhecimento: null,
      disciplina_cod: '',
      tags: [],
      discursivas: [],
      objetivas: [],
      author: 'professor@ufg.br'
    });
    this.getQuestions();
  }

  returnToList() {
    this.router.navigate([LISTAS_LISTAR]);
  }

  submit() {
    const form = this.listForm.value;

    const result = {
      titulo: form.titulo,
      descricao: form.descricao,
      nivelDificuldade: form.nivelDificuldade,
      disciplina: {
        id: form.disciplina_cod
      },
      author: "professor@ufg.br",
      discursivas: [...this.selectedQuestions] };

    this.listsService.create(result).subscribe(x =>
      this.router.navigate(['/listas'])
    );
  }

  getQuestions() {
    this.questionsService.getAll().subscribe((x: ApiResponse) => this.questions = x.resultado);
  }

  addQuestion(question: fromQuestionsModels.Question) {
    console.log('selecionada');
    this.selectedQuestions.push(question);
  }
}
