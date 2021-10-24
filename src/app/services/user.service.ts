import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { environment } from '@src/environments/environment';
import { ApiPaths } from '@src/api-paths';
import { Session } from '@interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  session(): Observable<Session> {
    return this.httpClient.get<Session>(`${environment.apiUrl}/session`, { withCredentials: true });
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}${ApiPaths.Users}`);
  }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}${ApiPaths.Users}/${userId}`);
  }
}
