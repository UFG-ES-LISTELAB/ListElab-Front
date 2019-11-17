import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuestionsService} from '../questions.service';
import {QUESTOES_LISTAR} from '../../shared/constants/routes.contants';
import * as fromQuestionsModels from '../questions.model';
import {ApiResponse} from '../../shared/models/api-response.model';
export const emptyRespostaEsperada = {
  descricao: '',
  peso: 0
};

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit, OnDestroy {

  // Automação da tela
  screenTitle: string;
  isLoading: boolean;

  // Dados
  question: fromQuestionsModels.DiscursiveQuestion;
  questionForm: FormGroup;
  disciplinas: fromQuestionsModels.Discipline[] = [];
  areasDeConhecimento: fromQuestionsModels.KnowlegdeArea[] = [];

  get respostasEsperadas() {
    return this.questionForm.get('respostaEsperada') as FormArray;
  }

  getRespostaEsperadaControls() {
    return (<FormArray>this.questionForm.get('respostaEsperada')).controls;
  }

  constructor(private router: Router,
              private questionService: QuestionsService,
              private fb: FormBuilder) { }

  getDisciplinas(): void {
    this.questionService.gellAllDisciplinas().subscribe((response: ApiResponse) => {
      this.disciplinas = response.resultado;
      this.isLoading = false;
    }, error => console.log("Deu erro!"));
  }

  getAreasDeConhecimento() : void {
    this.questionService.getAllAreaDeconhecimento().subscribe((response: ApiResponse) => {
      this.areasDeConhecimento = response.resultado;
    }, error => console.log("Deu erro!"));
  }

  ngOnInit() {
    this.isLoading = false;
    this.questionService.selectedQuestion ?
          this.question = this.questionService.selectedQuestion
      : this.question = fromQuestionsModels.emptyQuestion;

    this.getDisciplinas();
    this.getAreasDeConhecimento();
    
    this.question.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';

    this.initForm();

    if (this.question && this.question.respostaEsperada ) {
      const respostasEsperadas = this.question.respostaEsperada;
      if (respostasEsperadas.length > 0) {
        respostasEsperadas.map(respostaEsperada => {
          this.addRespostaEsperada(respostaEsperada);
        });
      }
    }
  }

  ngOnDestroy() {
    this.questionService.selectedQuestion = null;
  }

  initForm() {
    this.questionForm = this.fb.group({
      id: this.question.id,
      tipo: this.question.tipo,
      areaDeConhecimentoId: this.question.areaDeConhecimento ? this.question.areaDeConhecimento.codigo : "",
      tempoMaximoDeResposta: this.question.tempoEsperadoResposta,
      nivelDificuldade: this.question.nivelDificuldade,
      enunciado: [this.question.enunciado, [Validators.required] ],
      disciplinaId: this.question.disciplina ? this.question.disciplina.codigo : "",
      respostaEsperada: this.fb.array([]),
      autor: this.question.usuario ? this.question.usuario : "professor@ufg.br"
    });
  }

  returnToList() {
    this.router.navigate([QUESTOES_LISTAR]);
  }

  submitted() {
    if (!this.question.id) {
      this.createQuestion(this.questionForm.value);
    } else {
      this.updateQuestion(this.questionForm.value);
    }
  }

  createQuestion(form: any) {
    this.isLoading = true;
    debugger;
    console.log(form);
    const question: fromQuestionsModels.DiscursiveQuestion = {
      enunciado: form.enunciado,
      areaDeConhecimento: {
        codigo: form.areaDeConhecimentoId
      },
      nivelDificuldade: form.nivelDificuldade,
      disciplina: {
        codigo: form.disciplinaId
      },
      tipo: form.tipo,
      tempoMaximoDeResposta: form.tempoMaximoDeResposta,
      respostaEsperada: [
        ...form.respostaEsperada
      ],
      tags: [],
      usuario: form.autor,
    };
    this.questionService.create(question).subscribe(success => {
      console.log(success);
      this.isLoading = false;
      this.router.navigate([QUESTOES_LISTAR]);
    }, error => this.isLoading = false);
  }

  updateQuestion(form: any) {
    this.isLoading = true;
    const question: fromQuestionsModels.DiscursiveQuestion = {
      id: form.id,
      enunciado: form.enunciado,
      areaDeConhecimento: {
        codigo: form.areaDeConhecimentoId
      },
      nivelDificuldade: form.nivelDificuldade,
      disciplina: {
        codigo: form.disciplinaId
      },
      tipo: form.tipo,
      tempoMaximoDeResposta: form.tempoMaximoDeResposta,
      respostaEsperada: [
        ...form.respostaEsperada
      ],
      tags: [],
      usuario: form.autor,
    };
    this.questionService.update(question).subscribe(success => {
      this.isLoading = false;
      console.log(success);
      this.router.navigate([QUESTOES_LISTAR]);
    }, error => {
      return this.isLoading = false;
    });
  }

  addRespostaEsperada(respostaEsperada: fromQuestionsModels.ExpectedAnswer = emptyRespostaEsperada): void {
    if (this.respostasEsperadas.length < 5) {
      this.respostasEsperadas.push(
        this.fb.group({
          descricao:  [respostaEsperada.descricao, Validators.required ],
          peso:       [respostaEsperada.peso, Validators.required]
        })
      );
    }
  }

  removeRespostaEsperada(resEsperadaIndex) {
    this.respostasEsperadas.removeAt(resEsperadaIndex);
  }
}
