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

  signin(username: string, password: string) {
    return this.httpClient.post<User>(`${environment.apiUrl}${ApiPaths.Auth}/signin`, {username, password})
  }

  signup(username: string, password: string, role: number) {
    return this.httpClient.post<User>(`${environment.apiUrl}${ApiPaths.Auth}/signup`, {username, password, role})
  }
}
