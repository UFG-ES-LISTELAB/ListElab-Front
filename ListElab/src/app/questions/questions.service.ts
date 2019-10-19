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

}


// requisicao fake
// const questions = [
//   {
//     id: 1,
//     tipo: 'Discursiva',
//     enunciado: '3) Enunciado de uma questão que precisa ser respondida',
//     dificuldade: 'Fácil',
//     disciplina: 'História do Brasil',
//     areaConhecimento: 'Ciências Humanas',
//     autor: 'Desconhecido',
//     tag: 'Cabral',
//   },
//   {
//     id: 2,
//     tipo: 'Discursiva',
//     enunciado: '3) Enunciado de uma questão que precisa ser respondida',
//     dificuldade: 'Fácil',
//     disciplina: 'História do Brasil',
//     areaConhecimento: 'Ciências Humanas',
//     autor: 'Desconhecido',
//     tag: 'Cabral',
//   }
// ];
// return new Observable(observer => {
//   observer.next(questions);
// });
