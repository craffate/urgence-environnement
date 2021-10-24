import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { Session } from '@interfaces/session';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() userId!: number;
  session$!: Observable<Session>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.session$ = this.userService.session();
  }

}
