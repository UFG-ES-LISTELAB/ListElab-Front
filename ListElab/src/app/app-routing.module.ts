import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QuestionsComponent} from './questions/questions.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
  // {
  //   path: 'questions',
  //   loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
