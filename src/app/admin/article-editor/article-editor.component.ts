import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '@interfaces/article';
import { Category } from '@interfaces/category';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ArticleEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { article: Article, categories: Category[] }
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(data.article.id),
      sku: new FormControl(data.article.sku),
      name: new FormControl(data.article.name),
      subtitle: new FormControl(data.article.subtitle),
      description: new FormControl(data.article.description),
      price: new FormControl(data.article.price),
      categoryId: new FormControl(data.article.categoryId)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

  close() {
    this.dialogRef.close(this.formGroup.value);
  }

}
