import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesTableComponent } from './articles-table/articles-table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ArticlesComponent,
    ArticlesTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
