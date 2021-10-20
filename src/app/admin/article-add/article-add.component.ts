import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '../../articles/article';
import { Category } from '../../articles/category';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  article: Article;

  constructor(
    public dialogRef: MatDialogRef<ArticleAddComponent>,
    @Inject(MAT_DIALOG_DATA) public categories: Category[]
  ) {
    this.article = {
      id: 0,
      name: '',
      subtitle: '',
      description: '',
      price: 0,
      category_id: 0
    }
  }

  ngOnInit(): void {
  }

}
