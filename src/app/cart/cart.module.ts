import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ClearCartDialogComponent } from './clear-cart-dialog/clear-cart-dialog.component';
import { PaypalComponent } from './paypal/paypal.component';


@NgModule({
  declarations: [
    CartListComponent,
    ClearCartDialogComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    CartRoutingModule
  ],
  providers: [ DecimalPipe ]
})
export class CartModule { }
