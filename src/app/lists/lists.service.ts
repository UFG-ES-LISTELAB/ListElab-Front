import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

import {API} from '../shared/constants/api.constants';
import * as fromListsModels from './lists.model';
import {Question} from '../questions/questions.model';

// titulo: string;
// questoesDiscursiva: any[];
// questoesMultiplaEscolha: any[];
// questoesAssociacaoDeColunas: any[];
// questoesVerdadeiroOuFalso: any[];
// prontaParaAplicacao: boolean;
// usuario: string;
// qtdQuestoes: number;

class ListaConcreta {
    constructor(
        public titulo = '',
        public questoesDiscursiva = [],
        public questoesMultiplaEscolha = [],
        public questoesAssociacaoDeColunas = [],
        public questoesVerdadeiroOuFalso = [],
        public prontaParaAplicacao = false,
        public usuario = 'professor@ufg.br',
        public qtdQuestoes = 0
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class ListsService {

    // Nova Lista
    novaLista: ListaConcreta = null;

    selectedList: fromListsModels.List;
    questionsList: Question[];

    constructor(private http: HttpClient) {}

    getAll(params?): Observable<any> {
        return this.http.get(`${environment.api}/${API.listas.base}`);
    }

    getOne(id, params?): Observable<any> {
        return this.http.get(`${environment.api}/${API.listas.base}/${id}`);
    }

    create(): Observable<any> {
        return this.http.post(`${environment.api}/${API.listas.base}`, this.novaLista);
    }

    update(): Observable<any> {
        return this.http.put(`${environment.api}/${API.listas.base}`, this.novaLista);
    }

    delete(id): Observable<any> {
        return this.http.delete(`${environment.api}/${API.listas.base}/${id}`);
    }

    // Nova Lista
    inicializarNovaLista() {
        return this.novaLista = new ListaConcreta();
    }

    cancelarNovaLista() {
        this.novaLista = null;
    }

    isListaInicializada() {
        return this.novaLista !== null;
    }

    updateNovaListaValue(lista) {
        this.novaLista = Object.assign({}, this.novaLista, ...lista);
    }

    onAddQuestaoToNovaLista(questao) {
        switch (questao.tipo) {
            case 0:
                console.log('Discursiva');
                this.novaLista.questoesDiscursiva.push(questao);
                this.novaLista.qtdQuestoes = this.novaLista.qtdQuestoes + 1;
                break;
            case 1:
                console.log('Multipla Escolha');
                this.novaLista.questoesMultiplaEscolha.push(questao);
                this.novaLista.qtdQuestoes = this.novaLista.qtdQuestoes + 1;
                break;
            default:
                console.log('Não sei');
        }
    }

}
