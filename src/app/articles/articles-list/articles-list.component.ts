import { Component, OnInit } from '@angular/core';

import { Article } from './article';

import { ARTICLES } from './mock-articles';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  articles = ARTICLES;

}
