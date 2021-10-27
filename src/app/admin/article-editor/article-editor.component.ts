import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '@interfaces/article';

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
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(article.id),
      sku: new FormControl(article.sku),
      name: new FormControl(article.name),
      subtitle: new FormControl(article.subtitle),
      description: new FormControl(article.description),
      price: new FormControl(article.price)
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
