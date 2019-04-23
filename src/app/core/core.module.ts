import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { WebStorageService } from './web-storage.service';


@NgModule({
  declarations: [
    MainLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    WebStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class CoreModule { }
