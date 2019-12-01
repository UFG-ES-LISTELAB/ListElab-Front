import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
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

    list: any;
    listForm: FormGroup;

    constructor(private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private listsService: ListsService,
                private router: Router) {}

    ngOnInit() {
        this.isLoading = true;
        this.isEditing = !!this.activatedRoute.snapshot.params.id;

        if ( this.isEditing ) {
            this.listsService.getOne(this.activatedRoute.snapshot.params.id).subscribe(list => {
                this.list = list.resultado;
                this.initialize();
            });
        } else {
            if (this.listsService.isListaInicializada()) {
                this.list = this.listsService.novaLista;
            } else {
                this.list = this.listsService.inicializarNovaLista();
            }
            this.initialize();
        }
    }

    initialize() {
        this.isEditingOrNot();
        this.initForm();
        this.list = this.getNovalista();
        this.isLoading = false;
    }

    isEditingOrNot() {
        this.list.id ? this.screenTitle = 'Alterar' : this.screenTitle = 'Criar';
    }

    getNovalista() {
        return this.listsService.novaLista;
    }

    initForm() {
        this.listForm = this.fb.group({
            id: this.list.id ? this.list.id : null,
            titulo: this.list.titulo,
            prontaParaAplicacao: false,
            usuario: this.list.usuario ?
                this.list.usuario :
                'professor@ufg.br'
        });
    }

    returnToList(): void {
        if (!this.isEditing) {
            this.listsService.cancelarNovaLista();
        }
        this.router.navigate([LISTAS_LISTAR]);
    }

    submit() {
        const form = this.listForm.value;
        const result = {
            titulo: form.titulo,
            prontaParaAplicacao: form.prontaParaAplicacao,
            usuario: form.usuario
        };
        if (!this.isEditing) {
            this.router.navigate(['/listas']);
        } else {
            this.router.navigate(['/listas', form.id]);
        }
    }

    navAddQuestions() {
        this.listsService.create(this.listForm).subscribe(list => {
            this.list = list;
        });
        this.router.navigate(['/questoes']);
    }

    saveList() {
        this.listsService.create(this.list).subscribe(x => {
            console.log(x);
        });
    }
}
