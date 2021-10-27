import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

import { Article } from '@interfaces/article';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ArticlesService } from '@services/articles.service';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.css']
})
export class ArticleImageComponent implements OnInit, AfterViewInit {

  slideIndex: number = 0;
  images!: string[];
  fd: FormData = new FormData();

  constructor(
    public dialogRef: MatDialogRef<ArticleImageComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article,
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.articlesService.getImages(this.article.id).subscribe((res) => this.images = res);
  }

  fileChosen(event: any): void {
    this.fd.set("article", event.target.files[0]);
  }

  addImage(): void {
    this.dialogRef.close(this.fd);
  }

  changeSlide(n: number): void {
    this.slideIndex += n;

    if (this.slideIndex >= this.images.length) {
      this.slideIndex = 0;
    }
    if (this.slideIndex < 0) {
      this.slideIndex = this.images.length - 1;
    }
  }

}
