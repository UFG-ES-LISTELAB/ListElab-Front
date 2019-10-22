import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ROUTES} from './shared/constants/routes.contants';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.questoes.base
  },
  {
    path: ROUTES.login.base,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: ROUTES.questoes.base,
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  },
  {
    path: ROUTES.listas.base,
    loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule)
  }
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
