import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { ImageService } from '@services/image.service';
import { CartService } from '@services/cart.service';
import { environment } from '@environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.css']
})
export class ArticlesDetailComponent implements OnInit {

  article$!: Observable<Article>;
  imagesUrl!: string[];

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private articlesService: ArticlesService,
    private imageService: ImageService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.article$ = this.articlesService.getArticle(id);
    this.imageService.getImages(id)
    .subscribe((res) => {
      this.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`);
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

  isInCart(article: Article) {
    return this.cartService.searchCart(article);
  }

}
