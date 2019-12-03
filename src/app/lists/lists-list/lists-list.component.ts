import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import {ListsService} from '../lists.service';
import {LoginService} from '../../login/login.service';
import {ApiResponse} from '../../shared/models/api-response.model';

import * as fromRoutesConstants from '../../shared/constants/routes.contants';
import * as fromListsModels from '../lists.model';
import Swal from 'sweetalert2';


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
                private loginService: LoginService,
                private listsService: ListsService) { }

    ngOnInit() {
        this.isLoading = true;
        this.getLists();
    }

    getLists() {
        this.isLoading = true;
        this.hasError = null;
        this.listsService.getAll().subscribe((response: ApiResponse) => {
            this.lists = response.resultado;
            this.isLoading = false;
        }, error => {
            this.hasError = error;
        });
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

    onSearch($event: any) {
        console.log($event);
    }
}
