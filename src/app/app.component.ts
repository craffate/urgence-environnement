import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Urgence Environnement';
  isAuth: boolean;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.isAuth = !!this.cookieService.get('sid');
  }

  signOut() {
    this.authService.signOut().subscribe();
  }

}
