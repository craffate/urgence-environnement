import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Article } from '@interfaces/article';
import { ArticlesService } from '@services/articles.service';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleAddComponent } from '../article-add/article-add.component';
import { OrderDeleteComponent } from '../order-delete/order-delete.component';
import { OrderService } from '@src/app/services/order.service';
import { UserService } from '@src/app/services/user.service';
import { Order } from '@src/app/interfaces/order';
import { User } from '@src/app/interfaces/user';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  articlesDataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>([]);
  ordersDataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  usersDataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  expandedOrderElement: Order | undefined;

  constructor(
    private articlesService: ArticlesService,
    private orderService: OrderService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((res) => this.articlesDataSource.data = res);
    this.orderService.getOrders().subscribe((res) => this.ordersDataSource.data = res);
    this.userService.getUsers().subscribe((res) => this.usersDataSource.data = res);
  }

  ngAfterViewInit(): void {
    this.articlesDataSource.paginator = this.paginator.toArray()[0];
    this.ordersDataSource.paginator = this.paginator.toArray()[1];
    this.usersDataSource.paginator = this.paginator.toArray()[2];
  }

  editArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleEditorComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((article: Article) => {
      if (article !== undefined) {
        this.articlesService.patchArticle(article.id, article).subscribe();
      }
    });
  }

  deleteArticle(article: Article): void {
    const dialogRef = this.dialog.open(ArticleDeleteComponent, {
      data: article
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.articlesService.deleteArticle(article.id).subscribe();
      }
    });
  }

  addArticle(): void {
    const dialogRef = this.dialog.open(ArticleAddComponent);

    dialogRef.afterClosed().subscribe((article: Article) => {
      if (article !== undefined) {
        this.articlesService.postArticle(article).subscribe();
      }
    });
  }

  deleteOrder(order: Order): void {
    const dialogRef = this.dialog.open(OrderDeleteComponent, {
      data: order
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.orderService.deleteOrder(order.id!).subscribe();
      }
    });
  }

}
