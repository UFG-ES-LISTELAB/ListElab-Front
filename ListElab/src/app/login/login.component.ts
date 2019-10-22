import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
  } from '@angular/forms';
  import {LoginService} from "./login.service"
import { Login } from "./login.model"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: Login;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginHttp: LoginService) {}

  ngOnInit() {
    this.login = { email: " ", password: " " };
    this.loginForm = this.fb.group({
      login: this.login.email,
      password: this.login.password
    });
    //console.log(this)
  }

  submitted() {
    console.log("this.questionForm.value", this.loginForm.value)
    let sendLogin = {
      email: this.loginForm.value.login,
      password: this.loginForm.value.password
    }
    this.loginHttp.login(sendLogin)
      .subscribe(
        data => console.log(data),
                      error => console.log(error)
    )
  }

}
