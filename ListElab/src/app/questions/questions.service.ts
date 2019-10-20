import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Question} from './questions.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  selectedQuestion: Question;

  constructor(private http: HttpClient) {}

  getQuestions(params?): Observable<any> {
    return this.http.get(`${environment.api}/QuestaoDiscursiva`);
  }

  getQuestion(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/QuestaoDiscusiva/consulta/${id}`);
  }

  createQuestion(question: Question): Observable<any> {
    return this.http.post(`${environment.api}/QuestaoDiscusiva/cadastre`, { question });
  }

  updateQuestion(question: Question): Observable<any> {
    return this.http.post(`${environment.api}/QuestaoDiscusiva/atualize`, { question });
  }

}
