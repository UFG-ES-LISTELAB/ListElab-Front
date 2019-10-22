import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListsComponent} from "./lists.component";
import {ListsListComponent} from "./lists-list/lists-list.component";


const routes: Routes = [
  {
    path: '', component: ListsComponent,  children: [
      { path: '', component: ListsListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
