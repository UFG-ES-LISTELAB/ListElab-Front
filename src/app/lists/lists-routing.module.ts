import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListsComponent} from './lists.component';
import {ListsListComponent} from './lists-list/lists-list.component';
import {ListsFormComponent} from './lists-form/lists-form.component';
import {ROUTES} from '../shared/constants/routes.contants';


const routes: Routes = [
    {
        path: '', component: ListsComponent, children: [
            {path: '', component: ListsListComponent},
            {path: `${ROUTES.listas.criar}`, component: ListsFormComponent},
            {path: `${ROUTES.listas.editar}`, component: ListsFormComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListsRoutingModule {
}
