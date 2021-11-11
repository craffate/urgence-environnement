import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    paypal.Buttons().render(this.paypalElement.nativeElement);
  }

}
