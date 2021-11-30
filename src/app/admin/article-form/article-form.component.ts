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

  @Input() article?: Article;

  categories: Category[] = [];

  articleForm: FormGroup = new FormGroup({
    id: new FormControl({ value: null, disabled: true }, Validators.required),
    sku: new FormControl({ value: null, disabled: true }),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    subtitle: new FormControl(null),
    description: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
    weight: new FormControl(null, Validators.min(0.01)),
    weight_unit: new FormControl(null),
    length: new FormControl(null, Validators.min(0.01)),
    width: new FormControl(null, Validators.min(0.01)),
    height: new FormControl(null, Validators.min(0.01)),
    dimensions_unit: new FormControl(null),
    Category: new FormControl(null, Validators.required)
  });

  constructor(
    private articlesService: ArticlesService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
    this.patchDefaultValues();
  }

  private patchDefaultValues(): void {
    if (this.article) {
      this.articleForm.patchValue(this.article);
    }
  }

  onSubmit(): void {
    if (this.article) {
      this.articlesService.patchArticle(this.article.id!, this.articleForm.getRawValue()).subscribe();
    } else {
      this.articlesService.postArticle(this.articleForm.value).subscribe();
    }
  }

  onDefault(): void {
    this.patchDefaultValues();
  }

  compareCategory(o1?: Category, o2?: Category): boolean {
    if (o1 && o2) {
      return (o1.id === o2.id);
    } else {
      return false;
    }
  }

}
