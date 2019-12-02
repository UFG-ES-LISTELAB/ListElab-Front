import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

import {API} from '../shared/constants/api.constants';

class ListaConcreta {

    constructor(
        public id = null,
        public titulo = '',
        public nivelDeDificuldade = 0,
        public questoesDiscursiva = [],
        public questoesMultiplaEscolha = [],
        public questoesAssociacaoDeColunas = [],
        public questoesVerdadeiroOuFalso = [],
        public prontaParaAplicacao = false,
        public usuario = '',
        public tiposDeQuestao = [0]
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class ListsService {

    // Nova Lista
    novaLista: ListaConcreta = null;
    editing = false;
    qtdQuestoes = 0;

    constructor(private http: HttpClient) {}

    getAll(params?): Observable<any> {
        return this.http.get(`${environment.api}/${API.listas.base}`);
    }

    getOne(id, params?): Observable<any> {
        return this.http.get(`${environment.api}/${API.listas.base}/${id}`);
    }

    create(): Observable<any> {
        this.editing = false;
        const nova = this.novaLista;
        delete nova.id;
        return this.http.post(`${environment.api}/${API.listas.base}`, nova);
    }

    update(): Observable<any> {
        this.editing = false;
        return this.http.put(`${environment.api}/${API.listas.base}`, this.novaLista);
    }

    delete(id): Observable<any> {
        this.editing = false;
        return this.http.delete(`${environment.api}/${API.listas.base}/${id}`);
    }

    // ===================== Nova Lista ==========================
    inicializarNovaLista(lista = null) {
        this.editing = true;
        if (lista !== null && lista.id !== null) {
            return this.novaLista = Object.assign({}, {...lista});
        }
        return this.novaLista = new ListaConcreta();
    }

    cancelarNovaLista() {
        this.editing = false;
        this.novaLista = null;
    }

    isListaInicializada() {
        return this.novaLista !== null;
    }

    updateNovaListaValue(lista) {
        this.novaLista = Object.assign({}, { ...this.novaLista }, { ...lista });
    }

    onAddQuestaoToNovaLista(questao) {
        switch (questao.tipo) {
            case 0:
                this.novaLista.questoesDiscursiva = [ ...this.novaLista.questoesDiscursiva, { questao } ];
                this.qtdQuestoes = this.qtdQuestoes + 1;
                console.log(this.novaLista.questoesDiscursiva);
                break;
            case 1:
                this.novaLista.questoesMultiplaEscolha = [ ...this.novaLista.questoesMultiplaEscolha, { questao } ];
                this.qtdQuestoes = this.qtdQuestoes + 1;
                break;
            default:
                console.log('Não sei');
        }
    }

    onRemoveQuestaoFromNovaLista(questao) {
        console.log(questao);
        switch (questao.tipo) {
            case 0:
                this.novaLista.questoesDiscursiva = this.novaLista.questoesDiscursiva.filter(x => x.questao.id !== questao.id);
                this.qtdQuestoes = this.qtdQuestoes - 1;
                console.log(this.novaLista.questoesDiscursiva);
                break;
            default:
                console.log('Não sei');
        }
    }

}
