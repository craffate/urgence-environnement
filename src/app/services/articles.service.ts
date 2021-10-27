import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.apiUrl}${ApiPaths.Articles}`);
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
