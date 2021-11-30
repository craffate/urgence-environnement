import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '@src/app/interfaces/image';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Output() selectedImageEvent = new EventEmitter<Image>();
  @Input() images?: Image[];

  selectedImage?: Image = undefined;

  readonly API = environment.apiUrl + '/';

  constructor() { }

  ngOnInit(): void {
    if (this.images && this.images.length > 0) {
      this.selectedImage = this.images[0];
      this.selectedImageEvent.emit(this.selectedImage);
    }
  }

  onImageClick(image: Image) {
    this.selectedImage = image;
    this.selectedImageEvent.emit(this.selectedImage);
  }

}
