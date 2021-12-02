import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Article } from '@interfaces/article';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  readonly titlePrefix = environment.titlePrefix;
  readonly API: string = environment.apiUrl + '/';
  cart$!: BehaviorSubject<Article[]>;
  cartTotal$!: BehaviorSubject<number>;

  constructor(
    private titleService: Title,
    private cartService: CartService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.titlePrefix + 'Panier');
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;
  }

  getArticles(): BehaviorSubject<Article[]> {
    return this.cartService.cart$;
  }

  getCartTotal(): BehaviorSubject<number> {
    return this.cartService.cartTotal$;
  }

  transactionSnackbar(transactionStatus: number) {
    if (transactionStatus === 0) {
      this.snackBar.open('Transaction effectuée avec succès', undefined, { duration: 3000 });
    } else if (transactionStatus === 1) {
      this.snackBar.open('Transaction annulée', undefined, { duration: 3000 });
    } else if (transactionStatus === 2) {
      this.snackBar.open('Erreur de transaction', undefined, { duration: 3000 });
    }
  }

  removeFromCart(article: Article): void {
    let snackBarRef = this.snackBar.open(article.name + ' a été supprimé du panier', 'ANNULER', { duration: 3000 });

    this.cartService.removeFromCart(article);
    snackBarRef.onAction().subscribe(() => {
      this.cartService.addToCart(article);
    });
  }

}