import Swal from 'sweetalert2';

import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import {DiscursiveQuestionsService} from '../discursiveQuestions.service';
import {LoginService} from '../../login/login.service';
import {ListsService} from '../../lists/lists.service';

import * as fromQuestionsModels from '../questions.model';
import * as fromRoutesConstants from '../../shared/constants/routes.contants';
import {AreaDeConhecimento} from '../../shared/models/areaDeConhecimento';
import {NivelDificuldade} from '../../shared/models/nivelDificuldade';
import {TipoQuestao} from '../../shared/models/tipoQuestao';

@Component({
    selector: 'app-questions-list',
    templateUrl: './questions-list.component.html',
    styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

    areaDeConhecimento = AreaDeConhecimento;
    nivelDificuldade = NivelDificuldade;
    tipoQuestao = TipoQuestao;

    // Barra de Busca
    displayedColumns = ['tipo', 'enunciado', 'dificuldade', 'tempoMaximoDeResposta', 'menu'];

    questions: fromQuestionsModels.Question[] = [];
    hasError: any;
    isLoading: boolean;


    novaLista = () => {
        return this.listsService.novaLista;
    }


    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private loginService: LoginService,
                private listsService: ListsService,
                private discursiveQuestionsService: DiscursiveQuestionsService) {
    }

    ngOnInit() {
        this.onSearch();
    }

    onSearch(params?) {
        // this.hasError = null;
        // this.isLoading = true;
        let obj = {};
        if (params) {
            console.log(params);
            if (params.tempoEsperadoResposta !== null &&
                params.tempoEsperadoResposta >= 0) {
                obj = Object.assign({}, {...obj}, {tempoEsperadoResposta: params.tempoEsperadoResposta.toString()});
            } else {
                obj = Object.assign({}, {...obj}, {tempoEsperadoResposta: '0'});
            }

            if (params.tipo !== null && params.tipo >= 0) {
                obj = Object.assign({}, {...obj}, {tipo: params.tipo.toString()});
            }

            if (params.nivelDificuldade !== null && params.nivelDificuldade >= 0) {
                obj = Object.assign({}, {...obj}, {nivelDificuldade: params.nivelDificuldade.toString()});
            }

            if (params.usuario !== '') {
                obj = Object.assign({}, {...obj}, {usuario: params.usuario});
            }

            if (params.areaDeConhecimento && params.areaDeConhecimento !== '') {
                obj = Object.assign({}, {...obj}, {areaDeConhecimento: params.areaDeConhecimento});
            }

            if (params.disciplina && params.disciplina !== '') {
                obj = Object.assign({}, {...obj}, {disciplina: params.disciplina});
            }

            if (params.enunciado && params.enunciado !== '') {
                obj = Object.assign({}, {...obj}, {enunciado: params.enunciado});
            }

            if (params.tags && params.tags !== '') {
                const tags = params.tags.replace(' ', '');
                const splittedTags = tags.split(',');
                let final = '';
                splittedTags.forEach(tag => {
                    console.log(tag);
                    final += `{ tags: ${tag}}, `;
                });
                obj = Object.assign({}, {...obj}, final);
            }

            this.discursiveQuestionsService
                .filters(obj)
                .subscribe(response => {
                    if (params) {
                        switch (params.tipo) {
                            case 0: // Discursiva
                                return this.questions = Object.assign([], [...response.resultado.discursiva]);
                            case 1: // multiplaEscolha
                                return this.questions = Object.assign([], [...response.resultado.multiplaEscolha]);
                            default:
                                this.questions = [];
                                this.questions = [...this.questions, ...response.resultado.discursiva];
                                this.questions = [...this.questions, ...response.resultado.multiplaEscolha];
                        }
                    }
                }, error => {
                    this.hasError = error;
                });
        } else {
            this.discursiveQuestionsService.filters().subscribe(response => {
                this.questions = [];
                this.questions = [...this.questions, ...response.resultado.discursiva];
                this.questions = [...this.questions, ...response.resultado.multiplaEscolha];
            });
        }
    }

    onNavQuestionNew() {
        this.discursiveQuestionsService.selectedQuestion = fromQuestionsModels.emptyQuestion;
        this.router.navigate([fromRoutesConstants.QUESTOES_FORMULARIO]);
    }

    onNavQuestionUpdate($event, question: fromQuestionsModels.Question) {
        $event.stopPropagation();
        this.discursiveQuestionsService.selectedQuestion = question;
        this.router.navigate(
            [fromRoutesConstants.QUESTOES_FORMULARIO, question.id]
        );
    }

    onNavQuestionDelete($event, question: fromQuestionsModels.Question) {
        $event.stopPropagation();
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'A operação não poderá ser revertida!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.isLoading = true;
                this.discursiveQuestionsService.delete(question.id).subscribe(response => {
                    this.isLoading = false;
                    this.questions = this.questions.filter(x => x.id !== question.id);
                    Swal.fire(
                        'Removida!',
                        'Sua questão foi removida.',
                        'success'
                    );
                }, error => {
                    this.isLoading = false;
                });
            }
        });
    }

    onSelect(question: fromQuestionsModels.Question) {
        // TODO: Implementar, pois estava dando erro de build.
    }

    iniciarNovaLista() {
        this.listsService.inicializarNovaLista();
    }

    cancelarNovaLista() {
        this.listsService.cancelarNovaLista();
    }

    isListaInicializada(): boolean {
        return this.listsService.isListaInicializada();
    }

    addQuestaoToNovaLista(event, questao: any) {
        event.stopPropagation();

        if (this.isListaInicializada()) {
            this.listsService.onAddQuestaoToNovaLista(questao);
        } else {
            console.log('não tem lista em aberto!');
        }
    }
}
