import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  articles!: Article[];
  totalPages!: number;
  pageIndex!: number;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pageIndex = 1;
    this.route.queryParams.subscribe((params) => {
      let httpParams = new HttpParams();

      if (params['category']) {
        httpParams = httpParams.append('category', params['category']);
      }
      if (params['name']) {
        httpParams = httpParams.append('name', params['name']);
      }
      if (params['page']) {
        this.pageIndex = parseInt(params['page']);
        if (this.pageIndex < 1) {
          this.pageIndex = 1;
        }
      }
      httpParams = httpParams.append('page', this.pageIndex);
      httpParams = httpParams.append('count', 12);
      this.articlesService.getArticles(httpParams).subscribe((res) => {
        this.articles = res.articles;
        this.totalPages = res.totalPages;
      });
    });
  }

}
