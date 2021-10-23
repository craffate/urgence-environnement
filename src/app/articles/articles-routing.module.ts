import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesDetailComponent } from './articles-detail/articles-detail.component';
import { ArticlesCategoriesComponent } from './articles-categories/articles-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesCategoriesComponent
  },
  {
    path: ':category',
    component: ArticlesListComponent,
    children: [
      { path: ':id', component: ArticlesDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
