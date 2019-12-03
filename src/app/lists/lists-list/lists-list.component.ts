import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import {ListsService} from '../lists.service';
import {LoginService} from '../../login/login.service';
import {ApiResponse} from '../../shared/models/api-response.model';

import * as fromRoutesConstants from '../../shared/constants/routes.contants';
import * as fromListsModels from '../lists.model';
import Swal from 'sweetalert2';
import {NotificationService} from '../../shared/services/notification.service';


@Component({
    selector: 'app-lists-list',
    templateUrl: './lists-list.component.html',
    styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements OnInit {

    displayedColumns = ['titulo', 'menu'];
    lists: fromListsModels.List[] = [];
    hasError: any;
    isLoading: boolean;

    constructor(private fb: FormBuilder,
                private router: Router,
                private notificationService: NotificationService,
                private loginService: LoginService,
                private listsService: ListsService) { }

    ngOnInit() {
        this.isLoading = true;
        this.onSearch();
    }

    onNew() {
        this.router.navigate([fromRoutesConstants.LISTAS_FORMULARIO]);
    }

    onSelected(event, list) {
        event.stopPropagation();
        console.log(list);
        this.router.navigate([fromRoutesConstants.LISTAS_FORMULARIO, list.id]);
    }

    onRemoved(event, list: fromListsModels.List) {
        event.stopPropagation();
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
                this.listsService.delete(list.id).subscribe(response => {
                    this.isLoading = false;
                    this.lists = this.lists.filter(x => x.id !== list.id);
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

    onSearch(params?: any) {
        let obj = {};

        if (params) {
            if (params.tempoEsperadoResposta !== null &&
              params.tempoEsperadoResposta >= 0) {
                obj = Object.assign({}, {...obj}, {tempoEsperadoResposta: params.tempoEsperadoResposta.toString()});
            } else {
                obj = Object.assign({}, {...obj}, {tempoEsperadoResposta: '0'});
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

            this.listsService.filters(obj).subscribe(response => {
                  console.log(response);
                  this.lists = response.resultado;
                  this.isLoading = false;
              }, error => {
                  this.hasError = error;
                  this.isLoading = false;
                  this.notificationService.error('Houve um problema ao tentar obter as Listas. Tente mais tarde.');
              });
        } else {
            this.listsService.filters().subscribe(response => {
                console.log('abaixo');
                console.log(response);
                this.lists = response.resultado;
                this.isLoading = false;
            }, (err) => {
                this.notificationService.error('Houve um problema ao tentar obter as Listas. Tente mais tarde.');
                this.isLoading = false;
            });
        }
    }
}
