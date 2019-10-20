import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QUESTOES_LISTAR} from '../../shared/constants/routes.contants';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PalavraChave, Question} from '../questions.model';
import {QuestionsService} from '../questions.service';
import {emptyQuestion} from '../questions-list/questions-list.component';

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

  screenTitle: string;
  question: Question;
  questionForm: FormGroup;

  get palavrasChaves() {
    return this.questionForm.get('palavrasChaves') as FormArray;
  }

  constructor(private router: Router,
              private questionService: QuestionsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.questionService.selectedQuestion ?
      this.question = this.questionService.selectedQuestion
      : this.question = emptyQuestion;

    this.question.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';

    this.questionForm = this.fb.group({
      id: this.question.id,
      tipo: this.question.tipo,
      areaDeConhecimento: this.question.areaDeConhecimento,
      tempoMaximoDeResposta: this.question.tempoMaximoDeResposta,
      nivelDificuldade: this.question.nivelDificuldade,
      enunciado: this.question.enunciado,
      palavrasChaves: this.fb.array([]),
      autor: this.question.usuario,
    });

    if (this.question && this.question.respostaEsperada ) {
      const palavrasChaves = this.question.respostaEsperada.palavrasChaves;
      if (palavrasChaves.length > 0) {
        palavrasChaves.map(palavraChave => {
          this.addPalavraChave(palavraChave);
        });
      }
    }
  }

  addPalavraChave(palavraChave: PalavraChave = emptyRespostaEsperada): void {
    if (this.palavrasChaves.length < 5) {
      this.palavrasChaves.push(
        this.fb.group({
          descricao:  [palavraChave.descricao, Validators.required ],
          peso:       [palavraChave.peso, Validators.required]
        })
      );
    }
  }

  removePalavraChave(palavraIndex) {
    this.palavrasChaves.removeAt(palavraIndex);
  }

  ngOnDestroy() {
    this.questionService.selectedQuestion = null;
  }

  handleReturnList() {
    this.router.navigate([QUESTOES_LISTAR]);
  }

  submitted() {
    if (!this.question.id) {
      this.createQuestion(this.questionForm.value);
    } else {
      this.updateQuestion(this.questionForm.value);
    }
  }


  createQuestion(question: Question) {
    this.questionService.createQuestion(question).subscribe(success => {
      console.log(success);
    });
  }

  updateQuestion(question: Question) {
    this.questionService.updateQuestion(question).subscribe(success => {
      console.log(success);
    });
  }
}
