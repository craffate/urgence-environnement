import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles$!: Observable<Article[]>;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.articles$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.articlesService.getCategory(params.get('category')!);
      })
    );
  }

}
