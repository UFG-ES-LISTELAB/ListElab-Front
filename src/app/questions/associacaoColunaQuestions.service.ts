import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {AssociationColumnsQuestion} from './questions.model';
import {API} from "../shared/constants/api.constants";


@Injectable({
  providedIn: 'root'
})
export class AssociacaoColunaService {

  selectedQuestion: AssociationColumnsQuestion;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.associacaoColuna}`);
  }

  getWithParams(params): Observable<any> {
    console.log(params);
    return this.http.get(`${environment.api}/${API.questoes.associacaoColuna}/filtro`, { params });
  }

  getOne(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.associacaoColuna}/${id}`);
  }

  create(question: AssociationColumnsQuestion): Observable<any> {
    return this.http.post(`${environment.api}/${API.questoes.associacaoColuna}`, question);
  }

  update(question: AssociationColumnsQuestion): Observable<any> {
    return this.http.put(`${environment.api}/${API.questoes.associacaoColuna}`, question);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${environment.api}/${API.questoes.associacaoColuna}/${id}`);
  }

}
