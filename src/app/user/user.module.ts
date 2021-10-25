import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule
  ]
})
export class UserModule { }
