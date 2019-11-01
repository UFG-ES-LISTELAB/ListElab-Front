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

import {environment} from "../../environments/environment";
import * as fromAPIConstants from "../shared/constants/api.constants";
import * as fromROUTESConstants from "../shared/constants/routes.contants";

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
    return this.http.post(`${environment.api}/${fromAPIConstants.API_LOGIN_ENTRAR}`, login).pipe(
      tap((response: ApiResponse) => {
        if(response.sucesso) {
          this.localStorageService.setItem('token', `Bearer ${response.resultado.token}`);
          this.onLogin.next();
        }
        return response;
      })
    );
  }

  logout(): void {
    this.localStorageService.clear();
    this.onLogout.next();
    this.router.navigate([`/${fromROUTESConstants.LOGIN}`]);
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
