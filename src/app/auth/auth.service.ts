import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ApiPaths } from '../../api-paths';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signin(email: string, password: string) {
    return this.httpClient.post<User>(`${environment.apiUrl}${ApiPaths.Auth}/signin`, {email, password})
  }

  signup(email: string, password: string, role: number) {
    return this.httpClient.post<User>(`${environment.apiUrl}${ApiPaths.Auth}/signup`, {email, password, role})
  }
}
