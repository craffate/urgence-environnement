import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';
import { Category } from '@interfaces/category';
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

  getArticle(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}${ApiPaths.Categories}`)
  }

  getCategory(categorySlug: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.apiUrl}${ApiPaths.Categories}/${categorySlug}`)
  }

  updateArticle(articleId: number, article: Article): Observable<Object> {
    return this.httpClient.put<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`, article);
  }

  deleteArticle(articleId: number): Observable<Article> {
    return this.httpClient.delete<Article>(`${environment.apiUrl}${ApiPaths.Articles}/${articleId}`);
  }

  createArticle(article: Article): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Articles}/${article.categoryId}`, article);
  }

  postImage(articleId: number, image: FormData): Observable<FormData> {
    return this.httpClient.post<FormData>(`${environment.apiUrl}${ApiPaths.Images}/${articleId}`, image);
  }

  getImages(articleId: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}${ApiPaths.Images}/${articleId}`);
  }

  deleteImage(imageId: number): Observable<string> {
    return this.httpClient.delete<string>(`${environment.apiUrl}${ApiPaths.Images}/${imageId}`);
  }
}
