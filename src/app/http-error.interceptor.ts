import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ withCredentials: true });    

    return next.handle(request).pipe(
      catchError((err) => {
        switch (err.status) {
          case 500:
            this._snackBar.open("Internal server error", undefined, { duration: 3000 })
            break;
          case 401:
            this._snackBar.open("Unauthorized Access", undefined, { duration: 3000 })
            break;
          case 404:
            this._snackBar.open("Not found", undefined, { duration: 3000 })
            break;
        }
        return throwError(err)
      })
    );
  }
}
