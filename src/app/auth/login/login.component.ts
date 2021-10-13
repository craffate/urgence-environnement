import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  signin(): void {
    this.authService.signin(this.formGroup.value.email, this.formGroup.value.password)
    .subscribe((): void => {
      this.router.navigateByUrl('/');
    });
  }

}
