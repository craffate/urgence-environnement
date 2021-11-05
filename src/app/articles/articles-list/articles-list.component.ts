import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { ImageService } from '@services/image.service';

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
