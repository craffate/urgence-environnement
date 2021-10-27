import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesDetailComponent } from './articles-detail/articles-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesListComponent
  },
  {
    path: ':id',
    component: ArticlesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
