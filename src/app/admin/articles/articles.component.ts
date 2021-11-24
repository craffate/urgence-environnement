import { Component, OnInit } from '@angular/core';

import { Category } from '@interfaces/category';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  categories: Category[];

  constructor(
    private categoryService: CategoryService
  ) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

}
