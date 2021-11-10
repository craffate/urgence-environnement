import { Injectable } from '@angular/core';

import { Article } from '@interfaces/article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(article: Article): Observable<Article[]> {
    let storage = JSON.parse(localStorage.getItem('cart')!) || [];

    storage.push(article);
    localStorage.setItem('cart', JSON.stringify(storage));
    return of(JSON.parse(localStorage.getItem('cart')!));
  }

  removeFromCart(article: Article): Observable<Article[]> {
    let storage = JSON.parse(localStorage.getItem('cart')!) || [];
    let cart = storage.filter((ar: Article) => ar.id !== article.id);

    localStorage.setItem('cart', JSON.stringify(cart));
    return of(JSON.parse(localStorage.getItem('cart')!));
  }

  getArticles(): Observable<Article[]> {
    return of(JSON.parse(localStorage.getItem('cart')!));
  }

  clearCart() {
    localStorage.removeItem('cart');
    return JSON.parse(localStorage.getItem('cart')!);
  }

  calculateTotal(): Observable<number> {
    let ret: number = 0;
    let storage = JSON.parse(localStorage.getItem('cart')!) || [];

    storage.forEach((element: Article) => {
      ret += element.price
      ret = parseFloat(ret.toFixed(2));
    });

    return of(ret);
  }

  searchCart(article: Article): Observable<Article> {
    let storage = JSON.parse(localStorage.getItem('cart')!) || [];
    let ret: Article[] = storage.filter((ar: Article) => ar.id === article.id);

    return of(ret[0]);
  }
}
