import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from "../shared/shared.module";

import {ListsRoutingModule} from "./lists-routing.module";
import {ListsListComponent} from './lists-list/lists-list.component';
import {ListsComponent} from "./lists.component";



@NgModule({
  declarations: [
    ListsListComponent,
    ListsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListsRoutingModule,
  ]
})
export class ListsModule {
}
