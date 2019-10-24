import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from "../shared/shared.module";

import {ListsRoutingModule} from "./lists-routing.module";
import {ListsListComponent} from './lists-list/lists-list.component';
import {ListsComponent} from "./lists.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ListsSearchComponent } from './components/lists-search/lists-search.component';
import { ListsCardComponent } from './components/lists-card/lists-card.component';



@NgModule({
  declarations: [
    ListsListComponent,
    ListsComponent,
    ListsSearchComponent,
    ListsCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ListsRoutingModule,
  ]
})
export class ListsModule {
}
