import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-cart-dialog',
  templateUrl: './clear-cart-dialog.component.html',
  styleUrls: ['./clear-cart-dialog.component.css']
})
export class ClearCartDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClearCartDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  clickYes(): void {
    this.dialogRef.close(true);
  }

}
