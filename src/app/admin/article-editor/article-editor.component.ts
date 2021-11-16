import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { Article } from '@interfaces/article';
import { Image } from '@interfaces/image';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageService } from '@services/image.service';
import { environment } from '@environments/environment';
import { CarouselComponent } from '@src/app/shared/carousel/carousel.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  @ViewChild(CarouselComponent) carousel!: CarouselComponent;

  formGroup: FormGroup;
  imagesUrl!: string[];
  images!: Image[];
  fd: FormData = new FormData();

  constructor(
    private imageService: ImageService,
    public dialogRef: MatDialogRef<ArticleEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(article.id),
      sku: new FormControl(article.sku),
      name: new FormControl(article.name),
      subtitle: new FormControl(article.subtitle),
      description: new FormControl(article.description),
      price: new FormControl(article.price)
    });
  }

  ngOnInit(): void {
    const httpParams = new HttpParams().append('articleId', this.article.id!);

    this.imageService.getImages(httpParams)
    .subscribe((res) => {
      this.images = res;
      this.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`);
    });
  }

  fileChosen(event: any): void {
    this.fd.set("image", event.target.files[0]);
    this.fd.set("articleId", `${this.article.id}`);
    this.sendImage();
  }

  sendImage() {
    this.imageService.postImage(this.fd).subscribe();
  }

  deleteImage() {
    this.imageService.deleteImage(this.images[this.carousel.slideIndex].id!).subscribe();
  }

  onSubmit(): void {
    this.dialogRef.close(this.formGroup.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
