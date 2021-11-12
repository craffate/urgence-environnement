import { Injectable } from '@angular/core';

import { Article } from '@interfaces/article';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Article[];
  cartTotal: number;
  cart$: BehaviorSubject<Article[]>;
  cartTotal$: BehaviorSubject<number>;

  constructor() {
    this.cart = [];
    this.cartTotal = 0.00;
    this.cart$ = new BehaviorSubject<Article[]>(this.cart);
    this.cartTotal$ = new BehaviorSubject<number>(this.cartTotal);
  }

  addToCart(article: Article): void {
    this.cart.push(article);
    this.calculateTotal();
    this.cart$.next(this.cart);
  }

  removeFromCart(article: Article): void {
    this.cart = this.cart.filter((ar: Article) => ar.id !== article.id);
    this.calculateTotal();
    this.cart$.next(this.cart);
  }

  clearCart(): void {
    this.cart = [];
    this.calculateTotal();
    this.cart$.next(this.cart);
  }

  isInCart(article: Article): boolean {
    let ret: Article[] = this.cart.filter((ar: Article) => ar.id === article.id);

    return ret.length > 0 ? true : false;
  }

  private calculateTotal(): void {
    this.cartTotal = 0.00;
    this.cart.forEach((element: Article) => {
      this.cartTotal += element.price
      this.cartTotal = parseFloat(this.cartTotal.toFixed(2));
    });
    this.cartTotal$.next(this.cartTotal);
  }

}
