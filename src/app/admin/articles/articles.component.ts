import { Component, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Category } from '@interfaces/category';
import { CategoryService } from '@services/category.service';
import { ArticlesService } from '@services/articles.service';
import { Article } from '@interfaces/article';
import { HttpParams } from '@angular/common/http';
import { Image } from '@src/app/interfaces/image';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ArticlesComponent implements OnInit {

  dataSource: MatTableDataSource<Article>;
  categories: Category[];
  expandedArticle!: Article | null;
  selectedImage!: Image;
  pageIndex!: number;
  totalPages!: number;


  readonly columnsToDisplay = [
    'id',
    'sku',
    'name',
    'subtitle',
    'price',
    'quantity',
    'weight',
    'weight_unit',
    'length',
    'width',
    'height',
    'dimensions_unit',
    'updated_at'
  ]

  constructor(
    private articlesService: ArticlesService,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {
    this.categories = [];
    this.dataSource = new MatTableDataSource<Article>();
  }

  ngOnInit(): void {
    this.pageIndex = 1;
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
    this.fetchPage(this.pageIndex);
  }

  storeSelectedImage(image: Image): void {
    this.selectedImage = image;
  }

  fetchPage(pageIndex: number): void {
    let httpParams = new HttpParams().set('quantity', -1).append('count', 25);

    httpParams = httpParams.set('page', pageIndex);

    this.articlesService.getArticles(httpParams)
      .subscribe(res => {
        this.dataSource.data = res.articles;
        this.totalPages = res.totalPages;
      });
  }

  openArticleFormDialog(): void {
    const dialogRef = this.dialog.open(ArticleFormComponent);
  }

}
