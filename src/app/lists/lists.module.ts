import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {ListsRoutingModule} from './lists-routing.module';

import {ListsListComponent} from './lists-list/lists-list.component';
import {ListsComponent} from './lists.component';
import {ListsSearchComponent} from './components/lists-search/lists-search.component';
import {ListsFormComponent} from './lists-form/lists-form.component';
import {QuestionsModule} from '../questions/questions.module';



@NgModule({
  declarations: [
    ListsListComponent,
    ListsComponent,
    ListsSearchComponent,
    ListsFormComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ListsRoutingModule,
    QuestionsModule,
  ]
})
export class ListsModule {
}
