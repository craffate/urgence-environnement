import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from './article';

import { environment } from '../../environments/environment';
import { ApiPaths } from '../../api-paths';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.apiUrl}${ApiPaths.Articles}`);
  }

  getArticle(articleId: number) {
    return this.httpClient.get<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }
}
