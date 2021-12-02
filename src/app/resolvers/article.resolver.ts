import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Article, ArticlesWithCount } from '@interfaces/article';
import { ArticlesService } from '@services/articles.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<ArticlesWithCount | Article> {

  constructor(private articlesService: ArticlesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticlesWithCount> | Observable<Article> {
    let httpParams = new HttpParams();
    if (route.queryParamMap.has('category')) {
      httpParams = httpParams.append('category', route.queryParamMap.get('category')!);
    }
    if (route.queryParamMap.has('name')) {
      httpParams = httpParams.append('name', route.queryParamMap.get('name')!);
    }
    httpParams = httpParams.append('page', route.queryParamMap.get('page') || 1);
    httpParams = httpParams.append('count', route.queryParamMap.get('count') || 12);

    return this.articlesService.getArticles(httpParams);
  }
}
