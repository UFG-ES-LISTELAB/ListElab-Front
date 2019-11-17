import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Question, QuestionFiltersDto, Discipline} from './questions.model';
import {API} from "../shared/constants/api.constants";


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  selectedQuestion: Question;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.base}`);
  }

  getWithParams(params): Observable<any> {
    console.log(params);
    return this.http.get(`${environment.api}/${API.questoes.base}/filtro`, { params });
  }

  getOne(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.base}/${id}`);
  }

  create(question: Question): Observable<any> {
    return this.http.post(`${environment.api}/${API.questoes.base}`, question);
  }

  update(question: Question): Observable<any> {
    return this.http.put(`${environment.api}/${API.questoes.base}`, question);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${environment.api}/${API.questoes.base}/${id}`);
  }

  gellAllDisciplinas() : Observable<any> {
    return this.http.get(`${environment.api}/${API.disciplinas.base}`);
  }
  
  getAllAreaDeconhecimento(): Observable<any> {
    return this.http.get(`${environment.api}/${API.areasDeConhecimento.base}`);
  }

}
