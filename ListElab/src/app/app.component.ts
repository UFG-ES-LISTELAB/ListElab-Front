import {Component, OnInit} from '@angular/core';
import {ROUTES} from './shared/constants/routes.contants';

import {UiService} from './shared/services/ui.service';
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  routes = ROUTES;

  get isAuthenticated() {
    return this.loginService.isAuthenticated();
  }

  constructor(
    private loginService: LoginService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {}

  sidebarOpened(): boolean {
    return this.uiService.sidebarOpened;
  }

  logout() {
    this.loginService.logout();
  }

}
