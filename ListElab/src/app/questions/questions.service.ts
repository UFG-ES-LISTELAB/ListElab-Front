import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get(`endpoint/`);
  }

  getQuestion(id: any): Observable<any> {
    return this.http.get(`endpoint/${id}`);
  }

}
