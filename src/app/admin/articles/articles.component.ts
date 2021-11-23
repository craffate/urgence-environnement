import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Category } from '@interfaces/category';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
