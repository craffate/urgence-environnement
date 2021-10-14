import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getArticle(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

  putArticle(article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${article.id}`, article);
  }

  deleteArticle(articleId: number): Observable<Article> {
    return this.httpClient.delete<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }
}
