import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '@interfaces/article';
import { Category } from '@interfaces/category';
import { ArticlesService } from '@services/articles.service';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  @Input() article!: Article;

  categories: Category[] = [];

  articleForm!: FormGroup;

  constructor(
    private articlesService: ArticlesService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
    if (!this.article) {
      this.article = <Article>{ Category: this.categories[0] };
    }
    this.articleForm = this.getArticleForm();
  }

  private getArticleForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: this.article.id, disabled: true }, Validators.required),
      sku: new FormControl({ value: this.article.sku, disabled: true }),
      name: new FormControl(this.article.name, [Validators.required, Validators.minLength(3)]),
      subtitle: new FormControl(this.article.subtitle),
      description: new FormControl(this.article.description),
      price: new FormControl(this.article.price, [Validators.required, Validators.min(0.01)]),
      quantity: new FormControl(this.article.quantity, [Validators.required, Validators.min(0)]),
      weight: new FormControl(this.article.weight, Validators.min(0.01)),
      weight_unit: new FormControl(this.article.weight_unit),
      length: new FormControl(this.article.length, Validators.min(0.01)),
      width: new FormControl(this.article.width, Validators.min(0.01)),
      height: new FormControl(this.article.height, Validators.min(0.01)),
      dimensions_unit: new FormControl(this.article.dimensions_unit),
      Category: new FormControl(this.article.Category, Validators.required)
    });
  }

  onSubmit(): void {
    this.articlesService.patchArticle(this.article.id!, this.articleForm.getRawValue()).subscribe();
  }

  onDefault(): void {
    this.articleForm = this.getArticleForm();
  }

  compareCategory(o1: Category, o2: Category): boolean {
    return (o1.id === o2.id);
  }

}
