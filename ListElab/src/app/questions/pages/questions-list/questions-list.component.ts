import { Component, OnInit } from '@angular/core';

import {Question} from '../../questions.model';
import {FormBuilder} from '@angular/forms';
import {QuestionsService} from '../../questions.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  question: Question;

  constructor(private fb: FormBuilder,
              private questionsService: QuestionsService) {}

  ngOnInit() {
    this.question = {
      id: 1,
      tipo: 'Discursiva',
      enunciado: '3) Enunciado de uma questão que precisa ser respondida',
      dificuldade: 'Fácil',
      disciplina: 'História do Brasil',
      areaConhecimento: 'Ciências Humanas',
      autor: 'Desconhecido',
      tags: [
        'Cabral',
        'Descobrimento'
      ]
    };
    // this.questionsService.getQuestions()
    //   .subscribe(questions => this.questions = questions);
  }

}
