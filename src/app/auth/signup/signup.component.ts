import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(1)
    });
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.authService.signUp(this.formGroup.value.email, this.formGroup.value.password, this.formGroup.value.role)
    .subscribe((): void => {
      this.router.navigateByUrl('/');
    });
  }
}
