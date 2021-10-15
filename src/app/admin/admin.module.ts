import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleDeleteComponent } from './article-delete/article-delete.component';
import { ArticleAddComponent } from './article-add/article-add.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ArticleEditorComponent,
    ArticleDeleteComponent,
    ArticleAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    AdminRoutingModule
  ],
  entryComponents: [
    ArticleEditorComponent,
    ArticleDeleteComponent
  ]
})
export class AdminModule { }
