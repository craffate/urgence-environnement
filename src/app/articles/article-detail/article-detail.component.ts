import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { CartService } from '@services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  readonly titlePrefix = environment.titlePrefix;
  article!: Article;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private articlesService: ArticlesService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.articlesService.getArticle(id).subscribe(res => {
      this.titleService.setTitle(this.titlePrefix + res.name);
      this.article = res
    });
  }

  addToCart(article: Article) {
    let snackBarRef = this.snackBar.open(article.name + ' a été ajouté au panier', 'ANNULER', { duration: 3000 });

    this.cartService.addToCart(article);
    snackBarRef.onAction().subscribe(() => {
      this.removeFromCart(article);
    });
  }

  removeFromCart(article: Article) {
    let snackBarRef = this.snackBar.open(article.name + ' a été supprimé au panier', 'ANNULER', { duration: 3000 });

    this.cartService.removeFromCart(article);
    snackBarRef.onAction().subscribe(() => {
      this.addToCart(article);
    });
  }

  isInCart(article: Article): boolean {
    return this.cartService.isInCart(article);
  }

}
