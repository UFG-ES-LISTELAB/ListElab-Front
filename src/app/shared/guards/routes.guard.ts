import { Injectable, Injector } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {

  constructor(private router: Router,
              private injector: Injector) { }

  canActivateChild() {
    let serviceLogin = this.injector.get(LoginService);
    if (!serviceLogin.isAuthenticated()) {
        return this.router.navigate(['/login']);
    }
    return true;
  }
}