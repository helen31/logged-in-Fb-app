import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
      ProfileComponent,
      UserLayoutComponent,
      ListComponent,
      MapComponent],
  imports: [
      CommonModule,
      SharedModule,
      UserRoutingModule
  ],
  providers: [UserService]
})
export class UserModule { }
