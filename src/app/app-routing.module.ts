import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesModule } from './articles/articles.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
  path: 'articles',
  loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
  },
  {
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
