import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';

import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  admin: boolean = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  signIn(user: User) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/login`, user, { responseType: 'text', withCredentials: true });
  }

  signOut() {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/logout`, { responseType: 'text', withCredentials: true });
  }

  isAuthenticated() {
    return this.httpClient.get(`${environment.apiUrl}${ApiPaths.Auth}`, { responseType: 'text', withCredentials: true, observe: 'response' });
  }

}
