import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@interfaces/category';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories(params?: HttpParams): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}${ApiPaths.Categories}`, { params: params });
  }

  postCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${environment.apiUrl}${ApiPaths.Articles}`, category);
  }

  getCategory(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${environment.apiUrl}${ApiPaths.Articles}/${categoryId}`);
  }

  patchCategory(categoryId: number, category: Category): Observable<Category> {
    return this.httpClient.patch<Category>(`${environment.apiUrl}${ApiPaths.Articles}/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Articles}/${categoryId}`);
  }

}
