import { Component, OnInit } from '@angular/core';
import { Article } from '@interfaces/article';
import { CartService } from '@services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cart$!: Observable<Article[]>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
  }

}
