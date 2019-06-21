import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FilterService } from '../shared/filter/filter.service';

/* Social */

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { PageNotFaundComponent } from './page-not-faund/page-not-faund.component';
import { PostMessageService } from './post-message.service';

const config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('1637129439866047')
    }
]);

export function provideConfig() {
    return config;
}


@NgModule({
  declarations: [
    MainLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent,
    PageNotFaundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    /* Social */
    SocialLoginModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    /* Social */
    { provide: AuthServiceConfig, useFactory: provideConfig },
    FilterService,
    PostMessageService
  ]
})
export class CoreModule { }
