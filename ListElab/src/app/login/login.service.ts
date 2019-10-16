import { Injectable } from '@angular/core';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {LOGIN} from '../shared/constants/routes.contants';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  onLogin = new Subject();
  onLogout = new Subject();

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {}

  login(login: any): Observable<any> {
    return this.http.post(`http://sifo.tech/api/Usuario/login`, login).pipe(
      tap(response => {
        console.log(response);
        this.localStorageService.setItem('token', `Bearer ${response.key}`);
        this.onLogin.next();
      })
    );
  }

  logout(): void {
    this.localStorageService.clear();
    this.onLogout.next();
    this.router.navigate(['/']);
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
