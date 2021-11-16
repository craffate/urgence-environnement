import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@src/app/services/auth.service';
import { CartService } from '@src/app/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '@interfaces/category';
import { CategoryService } from '@src/app/services/category.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title!: string;
  categories$: Observable<Category[]>;
  activeLink!: string;
  isAuth$: Observable<boolean>;

  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.categories$ = this.categoryService.getCategories();
    this.isAuth$ = this.authService.isAuth$;
  }

  ngOnInit(): void {
  }

  getCartQuantity(): BehaviorSubject<number> {
    return this.cartService.cartQuantity$;
  }

}
