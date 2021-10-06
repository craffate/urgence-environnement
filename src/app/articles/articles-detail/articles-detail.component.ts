import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Article } from '../article';

import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.css']
})
export class ArticlesDetailComponent implements OnInit {

  article$!: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ArticlesService
  ) { }

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
                this.service.getArticle(+(params.get('id')!)))
    );
  }

}
