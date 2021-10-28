import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Article } from '@interfaces/article';

import { ArticlesService } from '@services/articles.service';
import { ImageService } from '@services/image.service';
import { environment } from '@environments/environment';

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
    private articlesService: ArticlesService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.article$ = this.articlesService.getArticle(id);
    this.imageService.getImages(id)
    .subscribe((res) => {
      this.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`);
    });

  }

}
