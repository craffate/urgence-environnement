import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '@environments/environment';
import { Article } from '@interfaces/article';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  readonly titlePrefix = environment.titlePrefix;
  readonly API: string = environment.apiUrl + '/';
  articles!: Article[];
  totalPages!: number;
  pageIndex!: number;

  constructor(
    private titleService: Title,
    private titleCasePipe: TitleCasePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.articles = data.articlesWithCount.articles;
      this.totalPages = data.articlesWithCount.totalPages;
    });
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.titleService.setTitle(this.titlePrefix + this.titleCasePipe.transform(params['category']));
      } else {
        this.titleService.setTitle(this.titlePrefix + 'Articles');
      }
      this.pageIndex = parseInt(params['page'] || 1)
    });
  }

}
