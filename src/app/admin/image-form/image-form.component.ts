import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '@src/app/services/image.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {
  @Input() articleId!: number;

  imageForm!: FormData;

  progress!: number;

  constructor(
    private imageService: ImageService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.progress = 0;
    this.imageForm = new FormData();
    this.imageForm.set('articleId', this.articleId.toString());
  }

  fileChosen(event: any): void {
    for (let file of event.target.files) {
      this.imageForm.append('images', file);
    }
    this.sendImages();
  }

  private sendImages(): void {
    this.imageService.postImages(this.imageForm).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total! * 100);
          break;
        case HttpEventType.Response:
          this.snackBar.open('Images importées avec succès.', undefined, { duration: 3000 });
          this.progress = 0;
          this.imageForm = new FormData();
          break;
      }
    });
  }

}
