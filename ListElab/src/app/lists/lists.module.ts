import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";
import {ListsRoutingModule} from "./lists-routing.module";

import {ListsListComponent} from './lists-list/lists-list.component';
import {ListsComponent} from "./lists.component";
import {ListsSearchComponent} from './components/lists-search/lists-search.component';
import {ListsCardComponent} from './components/lists-card/lists-card.component';
import {ListsFormComponent} from './lists-form/lists-form.component';
import { ListsQuestionsComponent } from './components/lists-questions/lists-questions.component';



@NgModule({
  declarations: [
    ListsListComponent,
    ListsComponent,
    ListsSearchComponent,
    ListsCardComponent,
    ListsFormComponent,
    ListsQuestionsComponent
  ],
  exports: [
    ListsQuestionsComponent
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
