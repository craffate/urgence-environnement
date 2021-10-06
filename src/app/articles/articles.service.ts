import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from './article';
import { ARTICLES } from './mock-articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  getArticles(): Observable<Article[]> {
    return of(ARTICLES);
  }

  getArticle(articleId: number) {
    return this.getArticles().pipe(
      map((articles: Article[]) => articles.find(article => article.id === articleId)!)
    );
  }
}
