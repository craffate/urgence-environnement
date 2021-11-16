import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '@src/app/interfaces/category';
import { CategoryService } from '@src/app/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  formGroup: FormGroup;
  categories$: Observable<Category[]>;

  constructor(
    public dialogRef: MatDialogRef<ArticleAddComponent>,
    private categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.getCategories();
    this.formGroup = new FormGroup({
      sku: new FormControl(''),
      name: new FormControl(''),
      subtitle: new FormControl(''),
      description: new FormControl(''),
      quantity: new FormControl(1),
      price: new FormControl(0.0),
      Category: new FormControl(undefined)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.dialogRef.close(this.formGroup.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
