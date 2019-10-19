import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {QUESTOES_LISTAR} from '../../shared/constants/routes.contants';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {PalavraChave, Question} from '../questions.model';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {

  questionForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.questionForm = this.fb.group({
      id: [null],
      tipo: ['a'],
      areaDeConhecimento: ['a'],
      // disciplina: ['a'],
      tempoMaximoDeResposta: 0,
      dificuldade: ['a'],
      enunciado: ['a'],
      autor: ['a']
    });
  }

  addRespostaEsperada(): void {
    // this.respostasEsperadasForm = this.questionForm.get('respostasEsperadas') as FormArray;
    // this.respostasEsperadasForm.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      descricao: '',
      peso: 0.0
    });
  }

  handleReturnList() {
    this.router.navigate([QUESTOES_LISTAR]);
  }

  submitted() {
    console.log(this.questionForm.value);
  }
}
