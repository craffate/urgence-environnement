import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from '../../articles/article';
import { ArticlesService } from '../../articles/articles.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  articles$!: Observable<Article[]>;

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
