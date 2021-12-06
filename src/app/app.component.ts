import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Category } from './interfaces/category';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title: string = 'Urgence Environnement';
  loading: boolean = false;
  categories: Category[] = [];
  activeLink: string = 'Accueil';

  constructor(
    private titleService: Title,
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router
  ) {
    this.setTitle(this.title);
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.loading = true;
      } else if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
        this.loading = false;
      }
    });
    this.categoryService.getCategories().subscribe(res => this.categories = res);
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  public getCartQuantity(): BehaviorSubject<number> {
    return this.cartService.cartQuantity$;
  }

}
