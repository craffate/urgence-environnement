import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';

import { MatListModule } from '@angular/material/list'; 


@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    CartRoutingModule
  ]
})
export class CartModule { }
