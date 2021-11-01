import { Injectable } from '@angular/core';

import { Article } from '@interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(article: Article) {
    let storage = JSON.parse(localStorage.getItem('cart')!) || [];
    storage.push(article);
    localStorage.setItem('cart', JSON.stringify(storage));
  }

  getArticles() {
    return JSON.parse(localStorage.getItem('cart')!);
  }

  clearCart() {
    localStorage.removeItem('cart');
    return JSON.parse(localStorage.getItem('cart')!);
  }
}
