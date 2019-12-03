import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {LISTAS_LISTAR} from '../../shared/constants/routes.contants';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ListsService} from '../lists.service';


@Component({
    selector: 'app-lists-form',
    templateUrl: './lists-form.component.html',
    styleUrls: ['./lists-form.component.scss']
})
export class ListsFormComponent implements OnInit {

    isLoading = false;
    isEditing = false;
    hasError = null;
    screenTitle = '';
    listForm: FormGroup;
    questions = [];

    constructor(private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private listsService: ListsService,
                private router: Router) {}

    // Tem id? Sim. Já tem lista iniciada? Sim. O id é igual ao da tela? Sim. Mantem a lista iniciada na memória.
    // Tem id? Sim. Já tem lista iniciada? Sim. O id é igual ao da tela? Não. Finaliza a lista iniciada antes e traz o novo
    // Tem id? Não. Já tem lista iniciada? Não. Inicializa uma lista com o objeto padrão

    ngOnInit() {
        this.isLoading = true;
        this.isEditing = !!this.activatedRoute.snapshot.params.id;

        if ( this.isEditing ) {
            if (!this.listsService.isListaInicializada()) {
                this.listsService.getOne(this.activatedRoute.snapshot.params.id).subscribe(list => {
                    this.listsService.inicializarNovaLista(list.resultado);
                    this.initializeScreen();
                    this.extractQuestionsFromNovaLista();
                });
            } else {
                if (this.activatedRoute.snapshot.params.id === this.listsService.novaLista.id) {
                    console.log('id igual ao da lista em edição');
                    this.initializeScreen();
                    this.extractQuestionsFromNovaLista();
                } else {
                    console.log('id difere da lista em edicao. Fecharei a lista em aberto e abrirei a edicao da nova lista');
                    this.listsService.getOne(this.activatedRoute.snapshot.params.id).subscribe(list => {
                        this.listsService.cancelarNovaLista();
                        this.listsService.inicializarNovaLista(list.resultado);
                        this.initializeScreen();
                        this.extractQuestionsFromNovaLista();
                    });
                }
            }
        } else {
            // Se nova questao.
            // Lista já está iniciada? Sim. Mantenha
            // Lista já está iniciada? Não. Inicie-a
            if (this.listsService.isListaInicializada()) {
                this.initializeScreen();
                this.extractQuestionsFromNovaLista();
            } else {
                this.listsService.inicializarNovaLista();
                this.initializeScreen();
                this.extractQuestionsFromNovaLista();
            }
        }
    }

    initializeScreen() {
        this.defineScreenTitle();
        this.initializeForm();
        this.isLoading = false;
    }

    defineScreenTitle() {
        if (this.listsService.isListaInicializada()) {
            const lista = this.listsService.novaLista;
            lista.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';
        }
    }

    initializeForm() {
        if (this.listsService.isListaInicializada()) {
            const lista = this.listsService.novaLista;

            this.listForm = this.fb.group({
                id: lista.id ? lista.id : null,
                titulo: lista.titulo,
                prontaParaAplicacao: lista.prontaParaAplicacao,
                usuario: lista.usuario ?
                  lista.usuario :
                  'professor@ufg.br'
            });
        }
    }

    submit() {
        const form = this.listForm.value;
        this.listsService.updateNovaListaValue(form);
        if (!this.isEditing) {
            this.listsService.create().subscribe(x => {
                console.log(x);
                this.router.navigate(['/listas']);
            });
        } else {
            this.listsService.update().subscribe(x => {
                console.log(x);
                this.router.navigate(['/listas/formulario/', form.id]);
            });
        }
    }

    extractQuestionsFromNovaLista() {
        const novaLista = this.listsService.novaLista;
        const questoesDiscursivas = novaLista.questoesDiscursiva.map(x => x.questao);
        const questoesMultiplaEscolha = novaLista.questoesMultiplaEscolha.map(x => x.questao);
        const questoesVerdadeiroOuFalso = novaLista.questoesVerdadeiroOuFalso.map(x => x.questao);
        const questoesAssociacaoDeColunas = novaLista.questoesAssociacaoDeColunas.map(x => x.questao);

        this.questions = [
            ...questoesDiscursivas,
            ...questoesMultiplaEscolha,
            ...questoesVerdadeiroOuFalso,
            ...questoesAssociacaoDeColunas
        ];
    }

    navToListagemDeListas(): void {
        if (!this.isEditing) {
            this.listsService.cancelarNovaLista();
        }
        this.router.navigate([LISTAS_LISTAR]);
    }

    navToAddQuestions() {
        const form = this.listForm.value;
        this.listsService.novaLista.titulo = form.titulo;
        this.listsService.novaLista.prontaParaAplicacao = form.prontaParaAplicacao;
        this.listsService.novaLista.usuario = form.usuario;
        this.router.navigate(['/questoes']);
    }

    removeQuestionFromNovaLista(question: any) {
        this.listsService.onRemoveQuestaoFromNovaLista(question);
        this.extractQuestionsFromNovaLista();
    }
}
