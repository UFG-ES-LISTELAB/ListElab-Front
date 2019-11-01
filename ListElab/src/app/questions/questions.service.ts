import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Question} from './questions.model';
import {API} from "../shared/constants/api.constants";



@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  selectedQuestion: Question;

  constructor(private http: HttpClient) {}

  getAll(params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.base}`);
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

}
