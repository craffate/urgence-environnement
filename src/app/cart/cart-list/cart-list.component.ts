import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Article } from '@interfaces/article';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  articles: Article[] = this.cartService.getArticles();
  
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

}
