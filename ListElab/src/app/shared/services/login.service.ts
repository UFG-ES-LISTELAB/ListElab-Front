import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {LOGIN} from '../constants/routes.contants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  onLogin = new Subject();
  onLogout = new Subject();

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private localStorageService: LocalStorageService,
              private router: Router) {}

  isAuthenticated(): boolean {
    if (this.localStorageService.getItem('token') && this.localStorageService.getItem('user')) {
      return true;
    } else {
      this.localStorageService.clear();
      return false;
    }
  }

  getAuthenticatedUser(): any {
    return JSON.parse(this.localStorageService.getItem('user'));
  }

  login(login: any): Observable<any> {
    return this.http.post(LOGIN, login).pipe(
      tap(response => {
        this.localStorageService.setItem('token', `Token ${response.key}`);
        this.localStorageService.setItem('user', JSON.stringify(response.user));
        this.onLogin.next();
      })
    );
  }

  logout(): void {
    this.localStorageService.clear();
    this.onLogout.next();
    this.router.navigate(['/']);
  }

}
