import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DiscursiveQuestionsService } from '../discursiveQuestions.service';
import { MultiChoiceQuestionsService } from '../multiChoiceQuestions.service';
import { TrueOrFalseQuestionsService } from '../trueOrFalseQuestions.service';
import { AssociacaoColunaService } from '../associacaoColunaQuestions.service';

import { ApiResponse } from '../../shared/models/api-response.model';
import { QUESTOES_LISTAR } from '../../shared/constants/routes.contants';
import * as fromQuestionsModels from '../questions.model';
import { DisciplinesService } from "../../shared/services/disciplines.service";
import { AreaConhecimentoService } from "../../shared/services/areaConhecimento.service";
import { QuestionsModule } from '../questions.module';

export const emptyRespostaEsperada = {
  descricao: '',
  peso: 0
};

export const emptyAssociacaoDeColuna = {
  colunaPrincipal: {
    letra: '',
    descricao: ''
  },
  colunaAssociada: {
    letra: '',
    descricao: ''
  }
};

export const emptyVerdadeiroOuFalso = {
  descricao: '',
  correta: false
}

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
  question: fromQuestionsModels.Question;
  questionForm: FormGroup;
  disciplinas: fromQuestionsModels.Discipline[] = [];
  areasDeConhecimento: fromQuestionsModels.KnowlegdeArea[] = [];
  //Este atributo só será preenchido quando a questão for do tipo múltipla escolha
  indiceAlternativaCorreta?: number = 0;

  get respostasEsperadas() {
    return this.questionForm.get('respostaEsperada') as FormArray;
  }

  get tagsQuestao() {
    return this.questionForm.get('tagsQuestao') as FormArray;
  }

  get alternativasMultiplaEscolha() {
    return this.questionForm.get('alternativasMultiplaEscolha') as FormArray;
  }

  get associacaoColunas() {
    return this.questionForm.get('associacaoColunas') as FormArray;
  }

  get alternativasVerdadeiroOuFalso() {
    return this.questionForm.get('alternativasVerdadeiroOuFalso') as FormArray;
  }

  getRespostaEsperadaControls() {
    return (<FormArray>this.questionForm.get('respostaEsperada')).controls;
  }

  getTagsQuestaoControls() {
    return (<FormArray>this.questionForm.get('tagsQuestao')).controls;
  }

  getAlternativasMultiplaEscolhaControls() {
    return (<FormArray>this.questionForm.get('alternativasMultiplaEscolha')).controls;
  }

  getAssociacaoColunasControls() {
    return (<FormArray>this.questionForm.get('associacaoColunas')).controls;
  }

  getAlternativasVerdadeiroOuFalsoControls() {
    return (<FormArray>this.questionForm.get('alternativasVerdadeiroOuFalso')).controls;
  }

  constructor(private router: Router,
    private disciplinesService: DisciplinesService,
    private areaConhecimentoService: AreaConhecimentoService,
    private questionService: DiscursiveQuestionsService,
    private questionServiceMultipleChoice: MultiChoiceQuestionsService,
    private questionAssociacaoColunaService: AssociacaoColunaService,
    private questionServiceTrueOrFalse: TrueOrFalseQuestionsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.isLoading = false;

    if(this.questionAssociacaoColunaService.selectedQuestion && this.questionAssociacaoColunaService.selectedQuestion.id)
    {
      this.question = this.questionAssociacaoColunaService.selectedQuestion
    }
    else if(this.questionService.selectedQuestion && this.questionService.selectedQuestion.id)
    {
      this.question = this.questionService.selectedQuestion
    }
    else if(this.questionServiceMultipleChoice.selectedQuestion && this.questionServiceMultipleChoice.selectedQuestion.id)
    {
      this.question = this.questionServiceMultipleChoice.selectedQuestion
    }
    else if(this.questionServiceTrueOrFalse.selectedQuestion && this.questionServiceTrueOrFalse.selectedQuestion.id) {
      this.question = this.questionServiceTrueOrFalse.selectedQuestion;
    }
    else {
      this.question = fromQuestionsModels.emptyQuestionGenerica;
    }
    
    this.getDisciplinas();
    this.getAreasDeConhecimento();

    this.question.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';

    this.initForm();

    this.loadRespostasEsperadasQuestaoAtual();
    this.loadTagsQuestaoAtual();
  }

  getDisciplinas(): void {
    this.disciplinesService.getAll().subscribe((response: ApiResponse) => {
      this.disciplinas = response.resultado;
      this.isLoading = false;
    }, error => console.log("Deu erro!"));
  }

  getAreasDeConhecimento(): void {
    this.areaConhecimentoService.getAll().subscribe((response: ApiResponse) => {
      this.areasDeConhecimento = response.resultado;
    }, error => console.log("Deu erro!"));
  }

  loadRespostasEsperadasQuestaoAtual(): void {
    if (this.question && this.question.id) {
      if (this.question.tipo === 0) {
        const questionDiscursiva = this.question as fromQuestionsModels.DiscursiveQuestion;
        const respostasEsperadas = questionDiscursiva.respostaEsperada;
        if (respostasEsperadas.length > 0) {
          respostasEsperadas.map(respostaEsperada => {
            this.addRespostaEsperada(respostaEsperada);
          });
        }
      }
      if (this.question.tipo === 1) {
        const questionDiscursiva = this.question as fromQuestionsModels.ObjectiveQuestion;
        const respostasEsperadas = questionDiscursiva.respostaEsperada;
        if (respostasEsperadas.length > 0) {
          respostasEsperadas.map(respostaEsperada => {
            this.addAlternativa(respostaEsperada.descricao);
          });
        }
      }
      if (this.question.tipo === 2) {
        const questionDiscursiva = this.question as fromQuestionsModels.AssociationColumnsQuestion;
        const respostasEsperadas = questionDiscursiva.respostaEsperada;
        if (respostasEsperadas.length > 0) {
          respostasEsperadas.map(respostaEsperada => {
            this.addAssociacaoColuna(respostaEsperada);
          });
        }
      }

      if (this.question.tipo === 3) {
        const questionTrueOrFalse = this.question as fromQuestionsModels.TrueOrFalseQuestion;
        const respostasEsperadas = questionTrueOrFalse.respostaEsperada;
        if (respostasEsperadas.length > 0) {
          respostasEsperadas.map(respostaEsperada => {
            this.addVerdadeiroOuFalso(respostaEsperada);
          })
        }
      }
    }
  }

  loadTagsQuestaoAtual(): void {
    if (this.question && this.question.tags) {
      const tagsDaQuestao = this.question.tags;
      if (tagsDaQuestao.length > 0) {
        tagsDaQuestao.map(itemTag => {
          this.addTag(itemTag);
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
      tipoQuestao: this.question.tipo,
      areaDeConhecimentoId: this.question.areaDeConhecimento ? this.question.areaDeConhecimento.codigo : "",
      tempoMaximoDeResposta: this.question.tempoMaximoDeResposta,
      nivelDificuldade: this.question.nivelDificuldade,
      enunciado: [this.question.enunciado, [Validators.required]],
      disciplina: this.question.disciplina ? this.question.disciplina.codigo : "",
      respostaEsperada: this.fb.array([]),
      tagsQuestao: this.fb.array([]),
      alternativasMultiplaEscolha: this.fb.array([]),
      associacaoColunas: this.fb.array([]),
      alternativasVerdadeiroOuFalso: this.fb.array([]),
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
    switch (form.tipoQuestao) {
      case 0: //Questões discursivas
        const question: fromQuestionsModels.DiscursiveQuestion = {
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipoQuestao,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: [
            ...form.respostaEsperada
          ],
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor
        };

        this.questionService.create(question).subscribe(success => {
          console.log(success);
          this.isLoading = false;
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => this.isLoading = false);
        break;
      case 1: //Questões múltipla escolha
        const _indiceCorreta = this.indiceAlternativaCorreta;
        const alternativasRespostaEsperada = form.alternativasMultiplaEscolha.map((item, indice) => {
          return {
            descricao: item.descricao,
            correta: indice === _indiceCorreta ? true : false
          }
        });

        const questionMultipleChoice: fromQuestionsModels.ObjectiveQuestion = {
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipoQuestao,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: alternativasRespostaEsperada,
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor
        }

        this.questionServiceMultipleChoice.create(questionMultipleChoice).subscribe(success => {
          console.log(success);
          this.isLoading = false;
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => {
          console.log(error);
        });
        break;
      case 2: //Associação de colunas
        const associacaoColuna = form.associacaoColunas.map((item, indice) => {
          return {
            colunaPrincipal: {
              letra: this.converteIndiceEmAlfabeto(indice),
              descricao: item.colunaPrincipal
            },
            colunaAssociada: {
              letra: this.converteIndiceEmAlfabeto(indice),
              descricao: item.colunaAssociada
            }
          }
        });

        const questionAssociacaoColuna: fromQuestionsModels.AssociationColumnsQuestion = {
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipoQuestao,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: associacaoColuna,
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor
        }

        this.questionAssociacaoColunaService.create(questionAssociacaoColuna).subscribe(success => {
          console.log(success);
          this.isLoading = false;
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => {
          console.log(error);
        });
        break;
        break;
      case 3: //Verdadeiro ou falso
        const alternativasVouF = form.alternativasVerdadeiroOuFalso.map(item => {
          return {
            descricao: item.descricao,
            correta: item.correta === 'true' ? true : false
          }
        });

        const questionTrueOrFalse: fromQuestionsModels.TrueOrFalseQuestion = {
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipoQuestao,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: alternativasVouF,
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor
        }
        this.questionServiceTrueOrFalse.create(questionTrueOrFalse).subscribe(success => {
          console.log(success);
          this.isLoading = false;
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => {
          console.log(error);
        })
        break;
      default:
        console.log("Tipo de questão não encontrado ou inexistente!");
        break;
    }

  }

  updateQuestion(form: any) {
    this.isLoading = true;
    switch (form.tipoQuestao) {
      case 0:
        const question: fromQuestionsModels.DiscursiveQuestion = {
          id: form.id,
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipo,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: [
            ...form.respostaEsperada
          ],
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor,
        };

        this.questionService.update(question).subscribe(success => {
          this.isLoading = false;
          console.log(success);
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => {
          return this.isLoading = false;
        });
        break;
      case 1:
        const _indiceCorreta = this.indiceAlternativaCorreta;
        const alternativasRespostaEsperada = form.alternativasMultiplaEscolha.map((item, indice) => {
          return {
            descricao: item.descricao,
            correta: indice === _indiceCorreta ? true : false
          }
        });

        const questionMultipleChoice: fromQuestionsModels.ObjectiveQuestion = {
          id: form.id,
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipoQuestao,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: alternativasRespostaEsperada,
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor
        }

        this.questionServiceMultipleChoice.update(questionMultipleChoice).subscribe(success => {
          console.log(success);
          this.isLoading = false;
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => {
          console.log(error);
        });
        break;
      case 2:
        const associacaoColuna = form.associacaoColunas.map((item, indice) => {
          return {
            colunaPrincipal: {
              letra: this.converteIndiceEmAlfabeto(indice),
              descricao: item.colunaPrincipal
            },
            colunaAssociada: {
              letra: this.converteIndiceEmAlfabeto(indice),
              descricao: item.colunaAssociada
            }
          }
        });

        const questionAssociacaoColuna: fromQuestionsModels.AssociationColumnsQuestion = {
          id: form.id,
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipoQuestao,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: associacaoColuna,
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor
        }

        this.questionAssociacaoColunaService.update(questionAssociacaoColuna).subscribe(success => {
          console.log(success);
          this.isLoading = false;
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => {
          console.log(error);
        });
        break;
      case 3:
        const alternativasVouF = form.alternativasVerdadeiroOuFalso.map(item => {
          return {
            descricao: item.descricao,
            correta: item.correta === 'true' ? true : false
          }
        });
        const questionTrueOrFalse: fromQuestionsModels.TrueOrFalseQuestion = {
          id: form.id,
          enunciado: form.enunciado,
          areaDeConhecimento: {
            codigo: form.areaDeConhecimentoId
          },
          nivelDificuldade: form.nivelDificuldade,
          disciplina: {
            codigo: form.disciplina
          },
          tipo: form.tipoQuestao,
          tempoMaximoDeResposta: form.tempoMaximoDeResposta,
          respostaEsperada: alternativasVouF,
          tags: form.tagsQuestao.map(item => item.descricao),
          usuario: form.autor
        }

        this.questionServiceTrueOrFalse.update(questionTrueOrFalse).subscribe(success => {
          console.log(success);
          this.isLoading = false;
          this.router.navigate([QUESTOES_LISTAR]);
        }, error => {
          console.log(error);
        })
        break;
      default:
        console.log("Tipo selecionado incorreto ou inexistente!");
        break;
    }
  }

  addRespostaEsperada(respostaEsperada: fromQuestionsModels.ExpectedAnswer = emptyRespostaEsperada): void {
    if (this.respostasEsperadas.length < 5) {
      this.respostasEsperadas.push(
        this.fb.group({
          descricao: [respostaEsperada.descricao, Validators.required],
          peso: [respostaEsperada.peso, Validators.required]
        })
      );
    }
  }

  removeRespostaEsperada(resEsperadaIndex) {
    this.respostasEsperadas.removeAt(resEsperadaIndex);
  }

  addTag(tag: string = ""): void {
    this.tagsQuestao.push(
      this.fb.group({
        descricao: [tag, Validators.required]
      })
    );
  }

  removeTag(resTagIndex) {
    this.tagsQuestao.removeAt(resTagIndex);
  }

  addAlternativa(alternativa: string = ""): void {
    console.log(this.alternativasMultiplaEscolha);
    this.alternativasMultiplaEscolha.push(
      this.fb.group({
        descricao: [alternativa, Validators.required]
      })
    )
  }

  addAssociacaoColuna(associacaoColuna: fromQuestionsModels.AssociationColum = emptyAssociacaoDeColuna): void {
    this.associacaoColunas.push(
      this.fb.group({
        colunaPrincipal: [associacaoColuna.colunaPrincipal.descricao, Validators.required],
        colunaAssociada: [associacaoColuna.colunaAssociada.descricao, Validators.required],
      })
    )
  }

  removeAlternativa(alternativaIndex): void {
    this.alternativasMultiplaEscolha.removeAt(alternativaIndex);
  }

  removeAssociacaoDeColuna(colunaIndex): void {
    this.associacaoColunas.removeAt(colunaIndex);
  }

  marcar($event, indiceAlternativaCorreta: number) {
    this.indiceAlternativaCorreta = indiceAlternativaCorreta;
  }

  addVerdadeiroOuFalso(verdadeiroOuFalso: fromQuestionsModels.AlternativeAnswer = emptyVerdadeiroOuFalso): void {
    this.alternativasVerdadeiroOuFalso.push(
      this.fb.group({
        descricao: [verdadeiroOuFalso.descricao, Validators.required],
        correta: [verdadeiroOuFalso.correta ? 'true' : 'false']
      })
    );
  }

  removeVerdadeiroOuFalso(verdadeiroOuFalsoIndex): void {
    this.alternativasVerdadeiroOuFalso.removeAt(verdadeiroOuFalsoIndex);
  }

  converteIndiceEmAlfabeto(indice: number) {
    let dicionario = {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D',
      4: 'E',
      5: 'F',
      6: 'G',
      7: 'H',
      8: 'I',
      9: 'J',
      10: 'K'
    }

    return dicionario[indice];
  }
}
