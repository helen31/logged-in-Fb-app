import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { OpenerComponent } from './opener/opener.component';
import { PopupComponent } from './popup/popup.component';

const userRoutes: Routes = [
    {path: '', component: UserLayoutComponent, children: [
            {path: '', redirectTo: 'my-profile', pathMatch: 'prefix'},
            {path: 'my-profile', component: ProfileComponent, data: {currentUser: true}},
            {path: 'profile/:id', component: ProfileComponent, data: {currentUser: false}},
            {path: 'list', component: ListComponent},
            {path: 'map', component: MapComponent},
            {path: 'opener', component: OpenerComponent},
            {path: 'popup', component: PopupComponent}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
