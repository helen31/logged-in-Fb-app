import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { MapApiComponent } from './map-api/map-api.component';

// Google Maps
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from 'agm-overlays';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';



@NgModule({
  declarations: [
      ProfileComponent,
      UserLayoutComponent,
      ListComponent,
      MapComponent,
      MapApiComponent],
  imports: [
      CommonModule,
      SharedModule,
      UserRoutingModule,
      AgmOverlays,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBZ8nPw9XNQ2_C7XorPJW60ToKUMs2usng'
      }),
      AgmJsMarkerClustererModule
  ],
  providers: [UserService]
})
export class UserModule {
}
