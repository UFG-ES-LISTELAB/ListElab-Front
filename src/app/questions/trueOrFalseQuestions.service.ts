import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {TrueOrFalseQuestion} from './questions.model';
import {API} from "../shared/constants/api.constants";


@Injectable({
  providedIn: 'root'
})
export class TrueOrFalseQuestionsService {

  selectedQuestion: TrueOrFalseQuestion;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.multiplaEscolha}`);
  }

  getWithParams(params): Observable<any> {
    console.log(params);
    return this.http.get(`${environment.api}/${API.questoes.multiplaEscolha}/filtro`, { params });
  }

  getOne(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.multiplaEscolha}/${id}`);
  }

  create(question: TrueOrFalseQuestion): Observable<any> {
    return this.http.post(`${environment.api}/${API.questoes.multiplaEscolha}`, question);
  }

  update(question: TrueOrFalseQuestion): Observable<any> {
    return this.http.put(`${environment.api}/${API.questoes.multiplaEscolha}`, question);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${environment.api}/${API.questoes.multiplaEscolha}/${id}`);
  }

}
