import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '@interfaces/category';
import { CategoryService } from '@services/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<Category[]> {

  constructor(private categoryService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.categoryService.getCategories();
  }
}
