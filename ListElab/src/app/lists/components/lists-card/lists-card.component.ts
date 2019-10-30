import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {List} from "../../lists.model";
import {SelectionModel} from "@angular/cdk/collections";


@Component({
  selector: 'app-lists-card',
  templateUrl: './lists-card.component.html',
  styleUrls: ['./lists-card.component.scss']
})
export class ListsCardComponent implements OnInit {

  @Input() list: List;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onSelect(list: List) {
    this.selected.emit(list);
  }

  onDelete(list: List) {
    this.deleted.emit(list);
  }
}
