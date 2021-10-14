import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Article } from '../../articles/article';
import { ArticlesService } from '../../articles/articles.service';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  articles!: Article[];

  columnsToDisplay: string[] = ['name', 'subtitle', 'description', 'price']

  constructor(
    private articlesService: ArticlesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((res) => this.articles = res);
  }

  editArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleEditorComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((result: Article) => {
      this.articlesService.putArticle(result).subscribe();
    });
  }

  deleteArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleDeleteComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.articlesService.deleteArticle(article.id).subscribe();
      }
    });
  }

}
