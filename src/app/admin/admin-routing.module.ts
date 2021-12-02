import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleResolver } from '../resolvers/article.resolver';
import { CategoryResolver } from '../resolvers/category.resolver';
import { ArticlesComponent } from './articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    resolve: { articlesWithCount: ArticleResolver, categories: CategoryResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
