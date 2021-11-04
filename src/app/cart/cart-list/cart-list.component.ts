import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Article } from '@interfaces/article';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ClearCartDialogComponent } from '../clear-cart-dialog/clear-cart-dialog.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  articles$!: Observable<Article[]>;
  total: number = 12;
  
  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articles$ = this.cartService.getArticles();
  }

  removeFromCart(article: Article): void {
    let snackBarRef = this.snackBar.open(article.name + ' a été supprimé du panier', 'ANNULER', { duration: 3000 });

    this.articles$ = this.cartService.removeFromCart(article);
    snackBarRef.onAction().subscribe(() => {
      this.articles$ = this.cartService.addToCart(article);
    });
  }

  clearCart(): void {
    let dialogRef = this.dialog.open(ClearCartDialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.articles$ = this.cartService.clearCart();
        this.snackBar.open('Le panier a été vidé', undefined, { duration: 3000 });
      }
    });
  }

  calculateTotal(): Observable<number> {
    return this.cartService.calculateTotal();
  }

}