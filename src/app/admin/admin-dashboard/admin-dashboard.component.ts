import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Article } from '../../articles/article';
import { Category } from '../../articles/category';
import { ArticlesService } from '../../articles/articles.service';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleAddComponent } from '../article-add/article-add.component';
import { ArticleImageComponent } from '../article-image/article-image.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  categories!: Category[];
  articles!: Article[];

  columnsToDisplay: string[] = ['name', 'subtitle', 'description', 'price', 'category_id']

  constructor(
    private articlesService: ArticlesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((res) => this.articles = res);
    this.articlesService.getCategories().subscribe((res) => this.categories = res);
  }

  editArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleEditorComponent, {
      data: { article: article, categories: this.categories }
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

  addArticle(): void {
    const dialogRef = this.dialog.open(ArticleAddComponent, {
      data: this.categories
    });

    dialogRef.afterClosed().subscribe((result: Article) => {
      this.articlesService.postArticle(result).subscribe();
    });
  }

  showArticleImages(article: Article): void {
    const dialogRef = this.dialog.open(ArticleImageComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((fd: FormData) => {
      this.articlesService.postImage(article.id, fd).subscribe();
    });
  }

}
