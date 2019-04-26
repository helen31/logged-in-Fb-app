import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLayoutComponent } from './core/login-layout/login-layout.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFaundComponent } from './core/page-not-faund/page-not-faund.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
    },
    {
        path: 'login',
        component: LoginLayoutComponent,
        children: [
            { path: '',
                loadChildren: './auth/auth.module#AuthModule'
            }
        ]
    },
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
