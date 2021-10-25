import { Injectable } from '@angular/core';

import { Article } from '@interfaces/article';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Article[] = [];

  constructor() { }

  addToCart(article: Article) {
    this.cart.push(article);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(): Observable<Article[]> {
    return of(JSON.parse(localStorage.getItem('cart')!));
  }

}
