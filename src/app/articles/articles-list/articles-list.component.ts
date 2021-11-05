import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { concatMap, map, mergeAll, mergeMap, reduce, switchMap, tap, toArray } from 'rxjs/operators';
import { ImageService } from '@services/image.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles$!: Observable<Article[]>;

  constructor(
    private articlesService: ArticlesService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['categoryId']) {
        this.articles$ = this.articlesService.getArticles(params['categoryId']).pipe(
          map((articles) => articles.map((article => {
            this.imageService.getImages(article.id, 1).subscribe((res) => {
              article.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`)
            });
            return article
          })))
        );
      } else {
        this.articles$ = this.articlesService.getArticles().pipe(
          map((articles) => articles.map((article => {
            this.imageService.getImages(article.id, 1).subscribe((res) => {
              article.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`)
            });
            return article
          })))
        );
      }
    });
  }

}
