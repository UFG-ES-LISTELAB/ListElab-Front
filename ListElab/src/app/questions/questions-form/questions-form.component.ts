import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QUESTOES_LISTAR} from '../../shared/constants/routes.contants';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emptyQuestion, PalavraChave, Question} from '../questions.model';
import {QuestionsService} from '../questions.service';

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
      disciplina: 0,
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

  ngOnDestroy() {
    this.questionService.selectedQuestion = null;
  }

  submitted() {
    if (!this.question.id) {
      this.createQuestion(this.questionForm.value);
    } else {
      this.updateQuestion(this.questionForm.value);
    }
  }


  createQuestion(form: any) {
    const question: Question = {
      enunciado: form.enunciado,
      areaDeConhecimento: parseInt(form.areaDeConhecimento),
      nivelDificuldade: form.nivelDificuldade,
      disciplina: 0,
      tipo: form.tipo,
      tempoMaximoDeResposta: 0,
      respostaEsperada: {
        palavrasChaves: [
          ...form.palavrasChaves
        ],
      },
      tags: [],
      usuario: form.autor,
    };
    this.questionService.createOne(question).subscribe(success => {
      this.router.navigate([QUESTOES_LISTAR]);
    });
  }

  updateQuestion(form: any) {
    const question: Question = {
      id: form.id,
      enunciado: form.enunciado,
      areaDeConhecimento: parseInt(form.areaDeConhecimento),
      nivelDificuldade: form.nivelDificuldade,
      disciplina: 0,
      tipo: form.tipo,
      tempoMaximoDeResposta: 0,
      respostaEsperada: {
        palavrasChaves: [
          ...form.palavrasChaves
        ],
      },
      tags: [],
      usuario: form.autor,
    };
    this.questionService.updateQuestion(question).subscribe(success => {
      console.log(success);
    });
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
}
