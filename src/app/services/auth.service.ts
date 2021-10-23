import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';

import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(user: User) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/signin`, user, { responseType: 'text', withCredentials: true });
  }

  signUp(user: User) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/signup`, user, { responseType: 'text' });
  }

}
