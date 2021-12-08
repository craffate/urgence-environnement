import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

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

  postArticle(article: Article): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Articles}`, article, { observe: 'response' });
  }

  getArticle(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

  patchArticle(articleId: number, article: Article): Observable<HttpResponse<any>> {
    return this.httpClient.patch(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`, article, { observe: 'response' });
  }

  deleteArticle(articleId: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`, { observe: 'response' });
  }

}
