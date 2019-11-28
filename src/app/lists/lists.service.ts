import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

import {API} from "../shared/constants/api.constants";
import * as fromListsModels from "./lists.model";
import * as fromQuestionsModels from '../questions/questions.model';
import {Question} from "../questions/questions.model";

interface NovaLista {
  titulo: string;
  questoesDiscursivas: any[],
  questoesMultiplaEscolha: any[]
}

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  // selectedList: fromListsModels.List;
  // questionsList: Question[];

  constructor(private http: HttpClient) {}

  getAll(params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.listas.base}`);
  }

  getOne(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.listas.base}/${id}`);
  }

  create(list: any): Observable<any> {
    return this.http.post(`${environment.api}/${API.listas.base}`, list);
  }

  update(list: any): Observable<any> {
    return this.http.put(`${environment.api}/${API.listas.base}`, list);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${environment.api}/${API.listas.base}/${id}`);
  }

  // Irá se tornar um novo servico daqui para baixo

  novaLista: NovaLista = null;

  inicializarNovaLista() {
    this.novaLista = new class implements NovaLista {
      titulo = "";
      questoesDiscursivas = [];
      questoesMultiplaEscolha = [];
    }
  }

  cancelarNovaLista() {
    this.novaLista = null;
  }

  isListaInicializada() {
    return this.novaLista !== null;
  }

  onAddQuestaoToNovaLista(questao) {
    switch(questao.tipo) {
      case 0:
        console.log('Discursiva');
        this.novaLista.questoesDiscursivas.push(questao);
        break;
      case 1:
        console.log('Multipla Escolha');
        this.novaLista.questoesMultiplaEscolha.push(questao);
        break;
      default:
        console.log('Não sei');
    }
  }

}
