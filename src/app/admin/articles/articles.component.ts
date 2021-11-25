import { Component, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Category } from '@interfaces/category';
import { CategoryService } from '@services/category.service';
import { ArticlesService } from '@services/articles.service';
import { Article } from '@interfaces/article';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@src/environments/environment';

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

  categories: Category[];
  articles: Article[];
  expandedArticle!: Article | null;

  readonly API = environment.apiUrl + '/';
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
    private categoryService: CategoryService
  ) {
    this.articles = [];
    this.categories = [];
  }

  ngOnInit(): void {
    const httpParams = new HttpParams().set('quantity', -1).append('count', 0);

    this.articlesService.getArticles(httpParams)
      .pipe(map(res => res.articles))
      .subscribe(res => this.articles = res);
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

}
