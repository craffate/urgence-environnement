import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from '../../articles/article';
import { ArticlesService } from '../../articles/articles.service';

import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  providers: [ArticlesService],
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  @Input() articleId!: number;

  article$!: Observable<Article>;

  formGroup!: FormGroup;

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.article$ = this.articlesService.getArticle(this.articleId).pipe(
      switchMap((article: Article) => {
        this.formGroup = new FormGroup({
          id: new FormControl(article.id),
          name: new FormControl(article.name),
          subtitle: new FormControl(article.subtitle),
          description: new FormControl(article.description),
          price: new FormControl(article.price)
        });
        return this.articlesService.getArticle(this.articleId);
      })
    );
  }

  onSubmit(): void {
    this.articlesService.putArticle(this.formGroup.value).subscribe();
  }

}
