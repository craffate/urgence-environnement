import { DecimalPipe, formatNumber, getLocaleNumberFormat } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter, Inject, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { loadScript } from '@paypal/paypal-js';
import { AmountWithBreakdown, PurchaseItem } from '@paypal/paypal-js/types/apis/orders';
import { Article } from '@src/app/interfaces/article';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit, OnChanges {
  @ViewChild('paypalButtonContainer', { static: true }) paypalButtonContainer!: ElementRef;
  @Input() articles$!: Observable<Article[]>;
  @Input() total$!: Observable<number>;
  @Output() transactionStatus: EventEmitter<number> = new EventEmitter<number>();

  articles!: Article[];
  total!: string;

  constructor(
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    loadScript(environment.paypalScriptOptions).then((paypal) => {
      if (paypal) {
        paypal.Buttons!({
          style: environment.paypalButtonsStyle,
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                { amount: this.toPaypalAmountWithBreakdown(this.articles), items: this.toPaypalItems(this.articles) }
              ]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((res) => {
              this.transactionStatus.emit(0);
            });
          },
          onCancel: (data, actions) => {
            this.transactionStatus.emit(1);
          },
          onError: (err) => {
            this.transactionStatus.emit(2);
          }
        })
        .render(this.paypalButtonContainer.nativeElement);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["articles$"]) {
      this.articles$.subscribe((res) => this.articles = res);
    }
    if (changes["total$"]) {
      this.total$.subscribe((res) => this.total = this.decimalPipe.transform(res, "1.2-2", "en-US")!);
    }
  }

  private toPaypalItems(articles: Article[]): PurchaseItem[] {
    return articles.map(article => ({
      name: article.name,
      quantity: "1",
      unit_amount: { value: article.price.toString(), currency_code: environment.paypalCurrencyCode },
      sku: article.sku,
      category: "PHYSICAL_GOODS"
    }));
  }

  private toPaypalAmountWithBreakdown(articles: Article[]): AmountWithBreakdown {
    return {
      value: this.total.toString(),
      currency_code: environment.paypalCurrencyCode,
      breakdown: {
        item_total: { value: this.total, currency_code: environment.paypalCurrencyCode }
      }
    }
  }

}
