import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  slideIndex: number = 0;
  @Input() imagesUrl!: string[];

  constructor() { }

  ngOnInit(): void {
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
