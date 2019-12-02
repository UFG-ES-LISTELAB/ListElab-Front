import {Component, OnInit } from '@angular/core';
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

    ngOnInit() {
        this.isLoading = true;
        this.isEditing = !!this.activatedRoute.snapshot.params.id;

        if ( this.isEditing ) {
            if (!this.listsService.isListaInicializada()) {
                this.listsService.getOne(this.activatedRoute.snapshot.params.id).subscribe(list => {
                    this.listsService.novaLista = list.resultado;
                    this.extractQuestionsFromNovaLista();
                    this.initialize();
                });
            }
        } else {
            if (this.listsService.isListaInicializada()) {
                this.initialize();
            } else {
                this.initialize();
            }
        }
    }

    initialize() {
        this.defineScreenTitle();
        this.initializeForm();
        this.isLoading = false;
    }

    defineScreenTitle() {
        const lista = this.listsService.novaLista;
        lista.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';
    }

    initializeForm() {
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

    navToListagemDeListas(): void {
        if (!this.isEditing) {
            this.listsService.cancelarNovaLista();
        }
        this.router.navigate([LISTAS_LISTAR]);
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

    navToAddQuestions() {
        const form = this.listForm.value;
        this.listsService.novaLista.titulo = form.titulo;
        this.listsService.novaLista.prontaParaAplicacao = form.prontaParaAplicacao;
        this.listsService.novaLista.usuario = form.usuario;
        this.router.navigate(['/questoes']);
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
}
