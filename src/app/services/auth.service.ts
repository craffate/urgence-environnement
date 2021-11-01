import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';

import { User } from '@interfaces/user';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  admin: boolean = false;

  constructor(
    private httpClient: HttpClient,
    public userService: UserService,
  ) {
    userService.getProfile().subscribe((res) => {
      this.authenticated = !!res;
      this.admin = !!(res.role === 1);
    });
  }

  signIn(user: User) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/signin`, user, { responseType: 'text', withCredentials: true });
  }

  signUp(user: User) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/signup`, user, { responseType: 'text' });
  }

  signOut() {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/signout`, { responseType: 'text', withCredentials: true });
  }

}
