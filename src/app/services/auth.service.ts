import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ApiPaths } from '@src/api-paths';

import { User } from '@interfaces/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.isAuth$ = this.isAuthenticated().pipe(
      map((res) => !!(res.status === 200)),
      catchError((err) => {
        if (err.status === 401) {
          return of(false);
        } else {
          throw err;
        }
      })
      );
  }

  signIn(user: User) {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/login`, user, { responseType: 'text', withCredentials: true });
  }

  signOut() {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Auth}/logout`, { responseType: 'text', withCredentials: true });
  }

  private isAuthenticated() {
    return this.httpClient.get(`${environment.apiUrl}${ApiPaths.Auth}`, { responseType: 'text', withCredentials: true, observe: 'response' });
  }

}
