import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';


@NgModule({
  declarations: [ProfileComponent, UserLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: [UserService]
})
export class UserModule { }
