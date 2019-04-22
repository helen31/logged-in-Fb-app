import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // todo move it in shared module

import { ProfileComponent } from './profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { MyOwnCustomMaterialModule } from '../my-own-custom-material.module';


@NgModule({
  declarations: [ProfileComponent, UserLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MyOwnCustomMaterialModule // todo Put it in shared module
  ],
  providers: [UserService]
})
export class UserModule { }
