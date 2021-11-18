import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { ImageService } from '@services/image.service';
import { CartService } from '@services/cart.service';
import { environment } from '@environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.css']
})
export class ArticlesDetailComponent implements OnInit {

  readonly API: string = environment.apiUrl + '/';
  article$!: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private articlesService: ArticlesService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    const httpParams = new HttpParams().append('articleId', id)

    this.article$ = this.articlesService.getArticle(id);
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
