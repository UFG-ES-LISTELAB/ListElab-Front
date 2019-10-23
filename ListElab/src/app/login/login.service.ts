import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiResponse} from '../shared/models/api-response.model';

export interface LoginResponse extends ApiResponse {
  mensagem: string;
  resultado: string;
  sucesso: boolean;
}

import {LocalStorageService} from '../shared/services/local-storage.service';
import {NotificationService} from "../shared/services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  onLogin = new Subject();
  onLogout = new Subject();

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private notificationService: NotificationService,
              private router: Router) {}

  login(login: any): Observable<any> {
    return this.http.post(`http://sifo.tech/api/Usuario/login`, login).pipe(
      tap((response: ApiResponse) => {
        if(response.sucesso) {
          this.localStorageService.setItem('token', `Bearer ${response.resultado}`);
          this.onLogin.next();
        }
        return response;
      })
    );
  }

  logout(): void {
    this.localStorageService.clear();
    this.onLogout.next();
    this.router.navigate(['/login']);
    this.notificationService.success('Você saiu com sucesso!');
  }

  isAuthenticated(): boolean {
    if (this.localStorageService.getItem('token')) {
      return true;
    } else {
      this.localStorageService.clear();
      return false;
    }
  }

}
