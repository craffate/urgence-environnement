import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  readonly API: string = environment.apiUrl + '/';
  articles$!: Observable<Article[]>;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let httpParams = new HttpParams();

      if (params['category']) {
        httpParams = httpParams.append('category', params['category']);
      }
      if (params['name']) {
        httpParams = httpParams.append('name', params['name']);
      }
      this.articles$ = this.articlesService.getArticles(httpParams);
    });
  }

}
