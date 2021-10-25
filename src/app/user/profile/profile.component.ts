import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { Order } from '@interfaces/order';
import { Session } from '@interfaces/session';
import { OrderService } from '@src/app/services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() userId!: number;
  session$!: Observable<Session>;
  orders$!: Observable<Order[]>;

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.session$ = this.userService.session();
    this.orders$ = this.orderService.getOrders();
  }

}
