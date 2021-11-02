import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';
import { Article } from '@interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getArticles(categoryId?: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.apiUrl}${ApiPaths.Articles}${categoryId ? ('?categoryId=' + categoryId) : ''}`);
  }

  postArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${environment.apiUrl}${ApiPaths.Articles}`, article);
  }

  getArticle(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

  patchArticle(articleId: number, article: Article): Observable<Article> {
    return this.httpClient.patch<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`, article);
  }

  deleteArticle(articleId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

}
