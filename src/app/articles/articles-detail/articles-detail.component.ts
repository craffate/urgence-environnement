import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { CartService } from '@src/app/services/cart.service';

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.css']
})
export class ArticlesDetailComponent implements OnInit {

  article$!: Observable<Article>;
  articleImages$!: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.article$ = this.articlesService.getArticle(id);
    this.articleImages$ = this.articlesService.getImages(id);
  }

  addToCart(article: Article) {
    this.cartService.addToCart(article);
  }

}
