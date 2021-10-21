import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '@interfaces/article';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-delete',
  templateUrl: './article-delete.component.html',
  styleUrls: ['./article-delete.component.css']
})
export class ArticleDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ArticleDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) { }

  ngOnInit(): void {
  }

}
