import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCardComponent } from './article-card/article-card.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleDetailComponent,
    ArticleCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    ArticlesRoutingModule
  ],
  providers: [ TitleCasePipe ]
})
export class ArticlesModule { }
