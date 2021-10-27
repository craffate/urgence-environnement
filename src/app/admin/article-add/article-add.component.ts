import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ArticleAddComponent>,
  ) {
    this.formGroup = new FormGroup({
      sku: new FormControl(''),
      name: new FormControl(''),
      subtitle: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0.0)
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(this.formGroup.value);
  }

}
