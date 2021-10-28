import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '@interfaces/article';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageService } from '@services/image.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  formGroup: FormGroup;
  imagesUrl!: string[];
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
    this.imageService.getImages(this.article.id)
    .subscribe((res) => {
      this.imagesUrl = res.map((image) => `${environment.apiUrl}/${image.path}`);
    });
  }

  fileChosen(event: any): void {
    this.fd.set("image", event.target.files[0]);
    this.fd.set("articleId", `${this.article.id}`);
  }

  sendImage() {
    this.imageService.postImage(this.fd).subscribe();
  }

  onSubmit(): void {
  }

  close() {
    this.dialogRef.close(this.formGroup.value);
  }

}
