import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  @Output() transactionStatus: EventEmitter<number> = new EventEmitter<number>();

  purchase_items$!: Observable<any[]>;
  total$!: Observable<number>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.purchase_items$ = this.cartService.getArticles().pipe(
      map((articles) => {
        return articles.map((article) => {
          return {
            sku: article.sku,
            name: article.name,
            unit_amount: {
              currency_code: 'EUR',
              value: article.price.toString()
            },
            currency: 'EUR',
            quantity: '1',
            category: 'PHYSICAL_GOODS'
          }
        })
      })
    );
    this.total$ = this.cartService.calculateTotal();
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        let purchase_items;
        let total;

        this.purchase_items$.subscribe((res) => purchase_items = res);
        this.total$.subscribe((res) => total = res.toString());

        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: total,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: total
                  }
                }
              },
              items: purchase_items
            },
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        actions.order.capture().then(() => {
          this.transactionStatus.emit(0);
        })
      },
      onCancel: (data: any, actions: any) => {
        this.transactionStatus.emit(1);
      },
      onError: (error: any) => {
        this.transactionStatus.emit(2);
      }
    }).render(this.paypalElement.nativeElement);
  }

}
