import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '@src/app/interfaces/image';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() images!: Image[];
  @Input() url!: string;
  @Output() selectedImageEvent: EventEmitter<Image>;
  selectedImage!: Image;

  constructor() {
    this.selectedImageEvent = new EventEmitter<Image>();
  }

  ngOnInit(): void {
    this.selectedImage = this.images[0];
    this.selectedImageEvent.emit(this.selectedImage);
  }

  onImageClick(image: Image) {
    this.selectedImage = image;
    this.selectedImageEvent.emit(this.selectedImage);
  }

}
