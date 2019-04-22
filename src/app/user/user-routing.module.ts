import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

const userRoutes: Routes = [
    {path: '', component: UserLayoutComponent, children: [
            {path: '', redirectTo: 'my-profile', pathMatch: 'prefix'},
            {path: 'my-profile', component: ProfileComponent}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}