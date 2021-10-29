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

  postOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${environment.apiUrl}${ApiPaths.Orders}`, order);
  }

  getOrder(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.apiUrl}${ApiPaths.Orders}/${orderId}`);
  }

  patchOrder(orderId: number, order: Order): Observable<Order> {
    return this.httpClient.patch<Order>(`${environment.apiUrl}${ApiPaths.Orders}/${orderId}`, order)
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Orders}/${orderId}`);
  }

  getProfileOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.apiUrl}${ApiPaths.Profile}/orders`, { withCredentials: true });
  }

}
