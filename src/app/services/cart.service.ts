import { Injectable } from '@angular/core';

import { Article } from '@interfaces/article';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Article[];
  cartTotal: number;
  cartQuantity: number;
  cart$: BehaviorSubject<Article[]>;
  cartTotal$: BehaviorSubject<number>;
  cartQuantity$: BehaviorSubject<number>;

  constructor() {
    this.cart = [];
    this.cartTotal = 0.00;
    this.cartQuantity = 0;
    this.cart$ = new BehaviorSubject<Article[]>(this.cart);
    this.cartTotal$ = new BehaviorSubject<number>(this.cartTotal);
    this.cartQuantity$ = new BehaviorSubject<number>(this.cartQuantity);
  }

  addToCart(article: Article): void {
    this.cart.push(article);
    this.cartQuantity += 1;
    this.calculateTotal();
    this.cart$.next(this.cart);
    this.cartQuantity$.next(this.cartQuantity);
  }

  removeFromCart(article: Article): void {
    this.cart = this.cart.filter((ar: Article) => ar.id !== article.id);
    this.cartQuantity -= 1;
    this.calculateTotal();
    this.cart$.next(this.cart);
    this.cartQuantity$.next(this.cartQuantity);
  }

  clearCart(): void {
    this.cart = [];
    this.cartQuantity = 0;
    this.calculateTotal();
    this.cart$.next(this.cart);
    this.cartQuantity$.next(this.cartQuantity);
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
