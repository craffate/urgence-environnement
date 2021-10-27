import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

import { Article } from '@interfaces/article';
import { Image } from '@interfaces/image';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ImageService } from '@src/app/services/image.service';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.css']
})
export class ArticleImageComponent implements OnInit, AfterViewInit {

  slideIndex: number = 0;
  images!: Image[];
  imagesUrl!: string[];
  fd: FormData = new FormData();

  constructor(
    public dialogRef: MatDialogRef<ArticleImageComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.imageService.getImages()
    .subscribe((res) => {
      this.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`);
    });
  }

  fileChosen(event: any): void {
    this.fd.set("image", event.target.files[0]);
  }

  close(): void {
    this.dialogRef.close(this.fd);
  }

  changeSlide(n: number): void {
    this.slideIndex += n;

    if (this.slideIndex >= this.imagesUrl.length) {
      this.slideIndex = 0;
    }
    if (this.slideIndex < 0) {
      this.slideIndex = this.imagesUrl.length - 1;
    }
  }

}
