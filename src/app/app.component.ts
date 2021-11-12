import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Urgence Environnement';

  constructor(
    private titleService: Title,
  ) {
    this.setTitle(this.title);
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

}
