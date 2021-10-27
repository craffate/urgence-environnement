import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Urgence Environnement';
  isAuth: boolean;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.setTitle(this.title);
    this.isAuth = !!this.cookieService.get('sid');
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  signOut() {
    this.authService.signOut().subscribe();
  }

}
