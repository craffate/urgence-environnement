import { Component, Input, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Article } from '@interfaces/article';
import { ArticlesService } from '@services/articles.service';
import { HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArticlesTableComponent implements OnInit {
  @Input() categorySlug!: string;

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
    'dimension_unit',
    'updated_at'
  ]

  articles!: Article[];
  totalPages!: number;

  expandedArticle!: Article | null;

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    let httpParams = new HttpParams();

    httpParams = httpParams.append('category', this.categorySlug);
    httpParams = httpParams.append('count', 0);
    httpParams = httpParams.append('quantity', -1);
    this.articlesService.getArticles(httpParams).subscribe((res) => {
      this.articles = res.articles;
      this.totalPages = res.totalPages;
    });
  }

}
