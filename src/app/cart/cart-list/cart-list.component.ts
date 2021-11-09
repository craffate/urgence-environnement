import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Article } from '@interfaces/article';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ClearCartDialogComponent } from '../clear-cart-dialog/clear-cart-dialog.component';

declare var paypal: any;

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  articles$!: Observable<Article[]>;
  
  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articles$ = this.cartService.getArticles();
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        tagline: false
      },
      createOrder: async (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: await this.calculateTotal().toPromise()
              }
            }
          ]
        })
      },
      onApprove: (data: any, actions: any) => {
        this.snackBar.open('Transaction effectuée avec succès', undefined, { duration: 3000 });
      },
      onCancel: (data: any, actions: any) => {
        this.snackBar.open('Transaction annulée', undefined, { duration: 3000 });
      },
      onError: (data: any, actions: any) => {
        this.snackBar.open('Erreur de transaction', undefined, { duration: 3000 });
      }
    }).render(this.paypalElement.nativeElement)
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