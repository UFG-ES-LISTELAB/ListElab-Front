import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {NotificationService} from "../shared/services/notification.service";
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
    private router: Router,
    private loginHttp: LoginService,
    private notificationService: NotificationService
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
        this.isLoading = false;
        this.router.navigate([ROUTES.questoes.base]);
        this.notificationService.success('Seja bem-vindo!');
      }, error => {
        this.isLoading = false;
        this.loginForm.reset();

        if(error.status === 400) {
          this.notificationService.error('Credenciais inválidas! Verifique usuário e senha informados e tente novamente');
        }
      });
  }

}
