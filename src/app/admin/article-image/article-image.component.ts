import { Component, OnInit, Inject } from '@angular/core';

import { Article } from '../../articles/article';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.css']
})
export class ArticleImageComponent implements OnInit {

  image!: File;
  fd: FormData = new FormData();

  constructor(
    public dialogRef: MatDialogRef<ArticleImageComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) { }

  ngOnInit(): void {
  }

  fileChosen(event: any) {
    this.image = event.target.files[0];
  }

  addImage() {
    this.fd.append("article", this.image);
    this.dialogRef.close(this.fd);
  }

}
