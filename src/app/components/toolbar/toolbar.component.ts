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
  categoryLinks: string[];
  activeLink!: string;
  isAuth$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.categoryLinks = [ 'Mobilier', 'Librairie', 'Loisir', 'Bricolage', 'Brocante', 'Objets d\'occasion', 'Divers'];
    this.isAuth$ = this.authService.isAuth$;
  }

  ngOnInit(): void {
  }

  getCartTotal(): BehaviorSubject<number> {
    return this.cartService.cartTotal$;
  }

}
