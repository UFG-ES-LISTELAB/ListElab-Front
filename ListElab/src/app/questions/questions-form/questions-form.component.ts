import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QUESTOES_LISTAR} from '../../shared/constants/routes.contants';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {PalavraChave, Question} from '../questions.model';
import {QuestionsService} from '../questions.service';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit, OnDestroy {

  screenTitle: string;
  questionForm: FormGroup;

  constructor(private router: Router,
              private questionService: QuestionsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    const questao = this.questionService.selectedQuestion;
    questao.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';

    console.log(questao);
    this.questionForm = this.fb.group({
      id: questao.id,
      tipo: questao.tipo,
      areaDeConhecimento: questao.areaDeConhecimento,
      // disciplina: ['a'],
      tempoMaximoDeResposta: questao.tempoMaximoDeResposta,
      nivelDificuldade: questao.nivelDificuldade,
      enunciado: questao.enunciado,
      autor: questao.usuario
    });
  }

  ngOnDestroy() {
    this.questionService.selectedQuestion = null;
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
