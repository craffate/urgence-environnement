import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Order } from '@interfaces/order';
import { ApiPaths } from '@src/api-paths';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';

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

  getByUserId(userId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.apiUrl}${ApiPaths.Orders}?userid=${userId}`);
  }

  createOrder(articles: Article[]): Observable<Order> {
    return this.httpClient.put<Order>(`${environment.apiUrl}${ApiPaths.Orders}`, articles);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}${ApiPaths.Orders}/${orderId}`);
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${environment.apiUrl}${ApiPaths.Orders}/${orderId}`, order);
  }
}
