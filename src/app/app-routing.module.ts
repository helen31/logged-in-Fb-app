import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFaundComponent } from './core/page-not-faund/page-not-faund.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: 'sign-up', component: SignupComponent},
    {
        path: '',
        component: MainLayoutComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: 'user',
                loadChildren: './user/user.module#UserModule'
            }
        ]
    },
    { path: '**', component: PageNotFaundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
