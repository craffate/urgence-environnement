import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleDeleteComponent } from './article-delete/article-delete.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import { ArticleImageComponent } from './article-image/article-image.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ArticleEditorComponent,
    ArticleDeleteComponent,
    ArticleAddComponent,
    ArticleImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    AdminRoutingModule
  ],
  entryComponents: [
    ArticleEditorComponent,
    ArticleDeleteComponent,
    ArticleImageComponent
  ]
})
export class AdminModule { }
