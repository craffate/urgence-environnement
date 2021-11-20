import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Article } from '@src/app/interfaces/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: Article;
  readonly API: string = environment.apiUrl + '/';

  constructor() { }

  ngOnInit(): void {
  }

}
