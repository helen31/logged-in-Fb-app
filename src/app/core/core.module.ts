import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { WebStorageService } from './web-storage.service';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FilterService } from '../shared/filter/filter.service';


@NgModule({
  declarations: [
    MainLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule // todo maybe remove
  ],
  providers: [
    AuthService,
    WebStorageService, // todo maybe remove it
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    FilterService
  ]
})
export class CoreModule { }
