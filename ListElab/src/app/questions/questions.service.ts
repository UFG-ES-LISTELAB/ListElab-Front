import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Question} from './questions.model';

const QUESTAO_DISCURSIVA = 'QuestaoDiscursiva';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  selectedQuestion: Question;

  constructor(private http: HttpClient) {}

  getQuestions(params?): Observable<any> {
    return this.http.get(`${environment.api}/${QUESTAO_DISCURSIVA}`);
  }

  getQuestion(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${QUESTAO_DISCURSIVA}/${id}`);
  }

  createOne(question: Question): Observable<any> {
    return this.http.post(`${environment.api}/${QUESTAO_DISCURSIVA}`, question);
  }

  updateQuestion(question: Question): Observable<any> {
    return this.http.put(`${environment.api}/${QUESTAO_DISCURSIVA}`, question);
  }

  deleteQuestion(id): Observable<any> {
    return this.http.delete(`${environment.api}/${QUESTAO_DISCURSIVA}/${id}`);
  }

}
