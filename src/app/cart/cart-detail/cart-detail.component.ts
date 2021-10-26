import { Component, OnInit } from '@angular/core';
import { Article } from '@interfaces/article';
import { CartService } from '@services/cart.service';
import { OrderService } from '@src/app/services/order.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cart!: Article[];

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((res) => {
      this.cart = res;
    });
  }

  createOrder(articles: Article[]) {
    this.orderService.createOrder(articles).subscribe();
  }

}
