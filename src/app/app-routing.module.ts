import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from './shared/guards/routes.guard';

import {ROUTES} from './shared/constants/routes.contants';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.questoes.base
  },
  {
    path: ROUTES.login,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: ROUTES.questoes.base,
    canActivateChild: [AuthGuardService],
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  },
  {
    path: ROUTES.listas.base,
    canActivateChild: [AuthGuardService],
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
