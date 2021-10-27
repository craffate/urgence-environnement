import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Article } from '@interfaces/article';
import { ArticlesService } from '@services/articles.service';
import { ImageService } from '@services/image.service';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleAddComponent } from '../article-add/article-add.component';
import { ArticleImageComponent } from '../article-image/article-image.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>([]);
  columnsToDisplay: string[] = ['sku', 'name', 'subtitle', 'description', 'price'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private articlesService: ArticlesService,
    private imageService: ImageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((res) => this.dataSource.data = res);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  editArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleEditorComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((article: Article) => {
      console.log(article);
      this.articlesService.patchArticle(article.id, article).subscribe();
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
    const dialogRef = this.dialog.open(ArticleAddComponent);

    dialogRef.afterClosed().subscribe((article: Article) => {
      console.log(article);
      this.articlesService.postArticle(article).subscribe();
    });
  }

  showArticleImages(article: Article): void {
    const dialogRef = this.dialog.open(ArticleImageComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((fd: FormData) => {
      this.imageService.postImage(fd).subscribe();
    });
  }

}
