import { Injectable } from '@angular/core';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {LOGIN} from '../shared/constants/routes.contants';

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

  login(login: any): Observable<any> {
    return this.http.post(LOGIN, login).pipe(
      tap(response => {
        this.localStorageService.setItem('token', `Token ${response.key}`);
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
