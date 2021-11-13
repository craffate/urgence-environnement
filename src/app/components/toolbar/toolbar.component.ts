import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@src/app/services/auth.service';
import { CartService } from '@src/app/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title!: string;
  readonly categories: Array<{ name: string, slug: string }>;
  activeLink!: string;
  isAuth$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.categories = [
      { name: 'Mobilier', slug: 'mobilier' },
      { name: 'Librairie', slug: 'librairie' },
      { name: 'Loisir', slug: 'loisir' },
      { name: 'Bricolage', slug: 'bricolage' },
      { name: 'Brocante', slug: 'brocante' },
      { name: 'Objets d\'occasion', slug: 'occasion' },
      { name: 'Divers', slug: 'divers' },
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
