import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Article } from '../../articles/article';
import { ArticlesService } from '../../articles/articles.service';

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
export class AdminDashboardComponent implements OnInit {

  articles$!: Observable<Article[]>;

  columnsToDisplay: string[] = ['name', 'subtitle', 'description', 'price']

  expandedArticle: Article | null = null;

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.articles$ = this.getArticles();
  }

  getArticles(): Observable<Article[]> {
    return this.articlesService.getArticles();
  }

}
