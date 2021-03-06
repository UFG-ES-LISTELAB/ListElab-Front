import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Question} from './questions.model';
import {API} from "../shared/constants/api.constants";


@Injectable({
  providedIn: 'root'
})
export class DiscursiveQuestionsService {

  selectedQuestion: Question;

  constructor(private http: HttpClient) {}

  filters(params?): Observable<any> {
    return this.http.get(`${environment.api}/Questao/filtro`, { params });
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.discursiva}`);
  }

  getOne(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.discursiva}/${id}`);
  }

  create(question: Question): Observable<any> {
    return this.http.post(`${environment.api}/${API.questoes.discursiva}`, question);
  }

  update(question: Question): Observable<any> {
    return this.http.put(`${environment.api}/${API.questoes.discursiva}`, question);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${environment.api}/${API.questoes.discursiva}/${id}`);
  }

  // gellAllDisciplinas() : Observable<any> {
  //   return this.http.get(`${environment.api}/${API.disciplinas.base}`);
  // }

  // getAllAreaDeconhecimento(): Observable<any> {
  //   return this.http.get(`${environment.api}/${API.areasDeConhecimento.base}`);
  // }

}
