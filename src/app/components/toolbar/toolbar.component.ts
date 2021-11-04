import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@src/app/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title!: string;
  categoryLinks: string[];
  activeLink!: string;

  constructor(
    private cartService: CartService
  ) {
    this.categoryLinks = [ 'Mobilier', 'Librairie', 'Loisir', 'Bricolage', 'Brocante', 'Objets d\'occasion', 'Divers'];
  }

  ngOnInit(): void {
  }

  getCartTotal(): Observable<number> {
    return this.cartService.calculateTotal();
  }

}
