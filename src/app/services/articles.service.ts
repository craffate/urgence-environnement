import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';
import { Article, ArticlesWithCount } from '@interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getArticles(params?: HttpParams): Observable<ArticlesWithCount> {
    return this.httpClient.get<ArticlesWithCount>(`${environment.apiUrl}${ApiPaths.Articles}`, { params: params });
  }

  postArticle(article: Article): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Articles}`, article);
  }

  getArticle(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

  patchArticle(articleId: number, article: Article): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`, article);
  }

  deleteArticle(articleId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

}
