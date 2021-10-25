import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Order } from '@interfaces/order';
import { ApiPaths } from '@src/api-paths';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.apiUrl}${ApiPaths.Orders}`);
  }

  getOrder(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.apiUrl}${ApiPaths.Orders}/${orderId}`);
  }
}
