import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '../../articles/article';

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
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) {
    this.newArticle = { ...article };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(this.newArticle);
  }

}
