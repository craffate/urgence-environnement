import { Injectable } from '@angular/core';

import { Article } from '@interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Article[] = [];

  constructor() { }

  addToCart(article: Article) {
    this.cart.push(article);
  }

  getCart(): Article[] {
    return this.cart;
  }

  deleteCart() {
    this.cart = [];
  }
}
