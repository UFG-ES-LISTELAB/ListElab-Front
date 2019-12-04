import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

import {API} from '../shared/constants/api.constants';
import {catchError, tap} from 'rxjs/operators';
import {NotificationService} from '../shared/services/notification.service';

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

    constructor(private http: HttpClient,
                private notificationService: NotificationService) {}

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
        return this.http.put(`${environment.api}/${API.listas.base}`, this.novaLista).pipe(
            tap(x => {
                this.notificationService.success('Lista alterada com sucesso!');
            }),
            catchError( (err) => {
                console.log(err);
                this.notificationService.error(
                    'Não foi possível realizar a operação. ' + err.error.erros[0].mensagem
                );
                return err;
            })
        );
    }

    filters(params?): Observable<any> {
        return this.http.get(`${environment.api}/Lista/filtro`, { params });
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
                const findQuestoesDiscursiva = this.novaLista.questoesDiscursiva.filter(q => {
                    return q.questao.id === questao.id;
                });
                if (findQuestoesDiscursiva.length <= 0) {
                    this.novaLista.questoesDiscursiva = [ ...this.novaLista.questoesDiscursiva, { questao } ];
                    this.qtdQuestoes = this.qtdQuestoes + 1;
                    this.notificationService.warn('Questão adicionada na Lista');
                } else {
                    this.notificationService.warn('Questão já existente na Lista');
                }
                break;
            case 1:
                const findQuestoesMultiplaEscolha = this.novaLista.questoesMultiplaEscolha.filter(q => {
                    return q.questao.id === questao.id;
                });
                if (findQuestoesMultiplaEscolha.length <= 0) {
                    this.novaLista.questoesMultiplaEscolha = [ ...this.novaLista.questoesMultiplaEscolha, { questao } ];
                    this.qtdQuestoes = this.qtdQuestoes + 1;
                    this.notificationService.warn('Questão adicionada na Lista');
                } else {
                    this.notificationService.warn('Questão já existente na Lista');
                }
                break;
            case 2:
                const findQuestoesAssociacaoDeColunas = this.novaLista.questoesAssociacaoDeColunas.filter(q => {
                    return q.questao.id === questao.id;
                });
                if (findQuestoesAssociacaoDeColunas.length <= 0) {
                    this.novaLista.questoesAssociacaoDeColunas = [...this.novaLista.questoesAssociacaoDeColunas, {questao}];
                    this.qtdQuestoes = this.qtdQuestoes + 1;
                    this.notificationService.warn('Questão adicionada na Lista');
                } else {
                    this.notificationService.warn('Questão já existente na Lista');
                }
                break;
            case 3:
                const findQuestoesVerdadeiroOuFalso = this.novaLista.questoesVerdadeiroOuFalso.filter(q => {
                    return q.questao.id === questao.id;
                });
                if (findQuestoesVerdadeiroOuFalso.length <= 0) {
                    this.novaLista.questoesVerdadeiroOuFalso = [...this.novaLista.questoesVerdadeiroOuFalso, {questao}];
                    this.qtdQuestoes = this.qtdQuestoes + 1;
                    this.notificationService.warn('Questão adicionada na Lista');
                } else {
                    this.notificationService.warn('Questão já existente na Lista');
                }
                break;
            default:
                console.log('Nenhum tipo conhecido.');
        }
    }

    onRemoveQuestaoFromNovaLista(questao) {
        switch (questao.tipo) {
            case 0: {
                this.novaLista.questoesDiscursiva =
                  this.novaLista.questoesDiscursiva.filter(x => x.questao.id !== questao.id);
                this.qtdQuestoes = this.qtdQuestoes - 1;
                this.notificationService.success('Questão removida da Lista');
                break;
            }
            case 1: {
                this.novaLista.questoesMultiplaEscolha =
                  this.novaLista.questoesMultiplaEscolha.filter(x => x.questao.id !== questao.id);
                this.qtdQuestoes = this.qtdQuestoes - 1;
                this.notificationService.success('Questão removida da Lista');
                break;
            }
            case 2: {
                this.novaLista.questoesAssociacaoDeColunas =
                  this.novaLista.questoesAssociacaoDeColunas.filter(x => x.questao.id !== questao.id);
                this.qtdQuestoes = this.qtdQuestoes - 1;
                this.notificationService.success('Questão removida da Lista');
                break;
            }
            case 3: {
                this.novaLista.questoesVerdadeiroOuFalso =
                  this.novaLista.questoesVerdadeiroOuFalso.filter(x => x.questao.id !== questao.id);
                this.qtdQuestoes = this.qtdQuestoes - 1;
                this.notificationService.success('Questão removida da Lista');
                break;
            }
            default:
                console.log('Nenhum tipo conhecido.');
        }
    }

}
