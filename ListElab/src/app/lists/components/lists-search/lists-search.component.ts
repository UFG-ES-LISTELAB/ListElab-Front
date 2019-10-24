import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-lists-search',
  templateUrl: './lists-search.component.html',
  styleUrls: ['./lists-search.component.scss']
})
export class ListsSearchComponent implements OnInit {

  listsSearchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.listsSearchForm = this.fb.group({

    });
  }

  ngOnInit() {
  }

}
