import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '@interfaces/article';
import { Category } from '@interfaces/category';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  newArticle: Article;

  constructor(
    public dialogRef: MatDialogRef<ArticleEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { article: Article, categories: Category[] }
  ) {
    this.newArticle = { ...data.article };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(this.newArticle);
  }

}
