import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesDetailComponent } from './articles-detail/articles-detail.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticlesDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
