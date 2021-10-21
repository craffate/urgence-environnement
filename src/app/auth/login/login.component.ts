import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';

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

  signIn(): void {
    this.authService.signIn(this.formGroup.value.email, this.formGroup.value.password)
    .subscribe((res) => {
      localStorage.setItem('token', res.headers.get('Authorization')?.split(' ')[1]!);
      this.router.navigate(['/']);
    });
  }

}
