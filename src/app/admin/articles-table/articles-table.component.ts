import { Component, Input, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Article } from '@interfaces/article';
import { ArticlesService } from '@services/articles.service';
import { HttpParams } from '@angular/common/http';

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

  readonly columnsName = [
    'ID',
    'SKU',
    'Nom',
    'Sous-titre',
    'Prix',
    'Quantité',
    'Poids',
    'Unité de poids',
    'Longueur',
    'Largeur',
    'Hauteur',
    'Unité de dimensions',
    'Date de mise à jour'
  ]
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
    this.articlesService.getArticles(httpParams).subscribe((res) => {
      this.articles = res.articles;
      this.totalPages = res.totalPages;
    });
  }

}
