import { Component, Inject, OnInit } from '@angular/core';

import { Order } from '@interfaces/order';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order
  ) { }

  ngOnInit(): void {
  }

}
