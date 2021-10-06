import { Injectable } from '@angular/core';

import { Article } from './article';
import { ARTICLES } from './mock-articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  getArticles(): Article[] {
    return ARTICLES;
  }
}
