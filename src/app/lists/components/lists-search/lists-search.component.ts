import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiResponse} from '../../../shared/models/api-response.model';
import {DisciplinesService} from '../../../shared/services/disciplines.service';
import {AreaConhecimentoService} from '../../../shared/services/areaConhecimento.service';
import { ListsService } from '../../lists.service';

@Component({
    selector: 'app-lists-search',
    templateUrl: './lists-search.component.html',
    styleUrls: ['./lists-search.component.scss']
})
export class ListsSearchComponent implements OnInit {

    @Output() submitted = new EventEmitter();
    @Output() listNew = new EventEmitter();
    searchForm: FormGroup;
    areasDeConhecimento: any;
    disciplinas: any;

    constructor(private fb: FormBuilder,
                private disciplinesService: DisciplinesService,
                private areaConhecimentoService: AreaConhecimentoService,
                private listService: ListsService) {
        this.searchForm = this.fb.group({});
    }

    ngOnInit() {
        this.getAreasDeConhecimento();
        this.getDisciplinas();

        this.searchForm = this.fb.group({
            nivelDificuldade: [],
            areaDeConhecimento: [''],
            disciplina: [''],
            tempoEsperadoResposta: [0],
            usuario: [''],
            tags: ['']
        });
    }

    getAreasDeConhecimento(): void {
        this.areaConhecimentoService.getAll()
            .subscribe((response: ApiResponse) => {
                this.areasDeConhecimento = response.resultado;
            }, error =>
                console.log('Erro na obtenção das áreas de conhecimento - Pesquisa!'));
    }

    getDisciplinas(): void {
        this.disciplinesService.getAll()
            .subscribe((response: ApiResponse) => {
                this.disciplinas = response.resultado;
            }, error =>
                console.log('Erro na obtenção das disciplinas - Pesquisa!'));
    }

    onListNew() {
        this.listService.cancelarNovaLista();
        this.listNew.emit();
    }

    onSearch() {
        this.submitted.emit(this.searchForm.value);
    }

}
