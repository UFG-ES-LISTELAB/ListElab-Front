import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements OnInit {

  isLoading: boolean;
  hasError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
