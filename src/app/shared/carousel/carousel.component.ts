import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@src/app/interfaces/image';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() images!: Image[];
  @Input() url!: string;
  selectedImageIndex: number;

  constructor() {
    this.selectedImageIndex = 0;
  }

  ngOnInit(): void {
  }

}
