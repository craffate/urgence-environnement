import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { ImageService } from '@services/image.service';
import { HttpParams } from '@angular/common/http';

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
    let httpParams = new HttpParams();

    this.route.queryParams.subscribe((params) => {
      if (params['categoryId']) {
        httpParams = httpParams.append('categoryId', params['categoryId']);
      }
    });
    httpParams.append('count', 1);
    this.articles$ = this.articlesService.getArticles(httpParams).pipe(
      map((articles) => articles.map((article => {
        this.imageService.getImages(httpParams).subscribe((res) => {
          article.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`)
        });
        return article
      })))
    );
  }

}
