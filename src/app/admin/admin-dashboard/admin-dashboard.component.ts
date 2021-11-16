import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Article } from '@interfaces/article';
import { ArticlesService } from '@services/articles.service';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleAddComponent } from '../article-add/article-add.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  articlesDataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>([]);

  constructor(
    private articlesService: ArticlesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((res) => this.articlesDataSource.data = res);
  }

  ngAfterViewInit(): void {
    this.articlesDataSource.paginator = this.paginator.toArray()[0];
  }

  editArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleEditorComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((article: Article) => {
      if (article !== undefined) {
        this.articlesService.patchArticle(article.id!, article).subscribe();
      }
    });
  }

  deleteArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleDeleteComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.articlesService.deleteArticle(article.id!).subscribe();
      }
    });
  }

  addArticle(): void {
    const dialogRef = this.dialog.open(ArticleAddComponent);

    dialogRef.afterClosed().subscribe((article: Article) => {
      if (article !== undefined) {
        this.articlesService.postArticle(article).subscribe();
      }
    });
  }

}
