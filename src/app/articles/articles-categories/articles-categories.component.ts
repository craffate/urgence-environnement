import { Component, OnInit } from '@angular/core';
import { Category } from '@src/app/interfaces/category';
import { ArticlesService } from '@src/app/services/articles.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles-categories',
  templateUrl: './articles-categories.component.html',
  styleUrls: ['./articles-categories.component.css']
})
export class ArticlesCategoriesComponent implements OnInit {

  categories$!: Observable<Category[]>;

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.articlesService.getCategories();
  }

}
