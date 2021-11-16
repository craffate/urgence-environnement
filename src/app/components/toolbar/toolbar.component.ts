import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@src/app/services/auth.service';
import { CartService } from '@src/app/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '@interfaces/category';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title!: string;
  readonly categories: Category[];
  activeLink!: string;
  isAuth$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.categories = [
      { id: 1, name: 'Mobilier', slug: 'mobilier' },
      { id: 2, name: 'Librairie', slug: 'librairie' },
      { id: 3, name: 'Loisir', slug: 'loisir' },
      { id: 4, name: 'Bricolage', slug: 'bricolage' },
      { id: 5, name: 'Brocante', slug: 'brocante' },
      { id: 6, name: 'Objets d\'occasion', slug: 'occasion' },
      { id: 7, name: 'Divers', slug: 'divers' },
    ];
    this.isAuth$ = this.authService.isAuth$;
  }

  ngOnInit(): void {
  }

  getCartTotal(): BehaviorSubject<number> {
    return this.cartService.cartTotal$;
  }

  getCartQuantity(): BehaviorSubject<number> {
    return this.cartService.cartQuantity$;
  }

}
