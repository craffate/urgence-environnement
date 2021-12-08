import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { environment } from '@src/environments/environment';
import { ApiPaths } from '@src/api-paths';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}${ApiPaths.Users}`);
  }

  postUser(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Users}`, user);
  }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}${ApiPaths.Users}/${userId}`);
  }

  patchUser(userId: number, user: User): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}${ApiPaths.Users}/${userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Users}/${userId}`);
  }

}
