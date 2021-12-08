import { Component, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Category } from '@interfaces/category';
import { Article } from '@interfaces/article';
import { Image } from '@src/app/interfaces/image';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ImageService } from '@src/app/services/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ArticlesComponent implements OnInit {

  readonly titlePrefix = environment.titlePrefix;

  dataSource = new MatTableDataSource<Article>();
  categories: Category[] = [];
  expandedArticle!: Article | null;
  selectedImage!: Image;
  pageIndex: number = 1;
  totalPages!: number;
  quantity: number = 0;
  count: number = 10;

  readonly columnsToDisplay = [
    'id',
    'sku',
    'name',
    'subtitle',
    'price',
    'quantity',
    'weight',
    'weight_unit',
    'length',
    'width',
    'height',
    'dimensions_unit',
    'updated_at'
  ]

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.titlePrefix + 'Administration (Articles)');
    this.route.data.subscribe(data => {
      this.dataSource = data.articlesWithCount.articles;
      this.totalPages = data.articlesWithCount.totalPages;
      this.categories = data.categories;
    });
    this.route.queryParams.subscribe(params => {
      this.pageIndex = parseInt(params['page'] || 1);
      this.quantity = parseInt(params['quantity'] || this.quantity);
      this.count = parseInt(params['count'] || this.count);
    });
  }

  storeSelectedImage(image: Image): void {
    this.selectedImage = image;
  }

  deleteSelectedImage(): void {
    this.imageService.deleteImage(this.selectedImage.id!).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open('Image supprimée avec succès.', undefined, { duration: 3000 });
      }
    });
  }

  openArticleFormDialog(): void {
    const dialogRef = this.dialog.open(ArticleFormComponent);
  }

  onQuantityChange(event: MatSliderChange) {
    this.router.navigate([], {
      queryParams: { quantity: event.value, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onCountChange(event: MatSliderChange) {
    this.router.navigate([], {
      queryParams: { count: event.value, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

}
