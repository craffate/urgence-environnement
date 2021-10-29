import { Injectable } from '@angular/core';

import { Article } from '@interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  articles: Article[] = [];

  constructor() { }

  addToCart(article: Article) {
    this.articles.push(article);
  }

  getArticles() {
    return this.articles;
  }

  clearCart() {
    this.articles = [];
    return this.articles;
  }
}
