import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
  `
})
export class ListsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
