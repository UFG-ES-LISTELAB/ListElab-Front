import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {LoginService} from "./login.service"

import {ROUTES} from "../shared/constants/routes.contants";
import {emptyLogin, Login} from "./login.model"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: Login;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private loginHttp: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.login = emptyLogin;
    this.loginForm = this.fb.group({
      email: [ this.login.email, [Validators.required, Validators.email] ],
      password: [ this.login.password, Validators.required ]
    });
  }

  submitted() {
    this.isLoading = true;
    this.loginHttp.login(this.loginForm.value)
      .subscribe(resposta => {
        if(!resposta.sucesso) {
          this.isLoading = false;
          this.loginForm.reset();
          this.loginForm.get('email').setErrors({ 'emailOrPasswordInvalid': true });
          this.loginForm.get('password').setErrors({ 'emailOrPasswordInvalid': true });
        } else {
          this.isLoading = false;
          return this.router.navigate([ROUTES.questoes.base]);
        }
      });
  }

}
