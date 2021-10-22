import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';

import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(username: string, password: string) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/signin`, {username, password});
  }

  signUp(username: string, password: string, role: number) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/signup`, {username, password, role});
  }
  
}
