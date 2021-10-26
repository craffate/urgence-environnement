import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartDetailComponent } from './cart-detail/cart-detail.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CartDetailComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class CartModule { }
