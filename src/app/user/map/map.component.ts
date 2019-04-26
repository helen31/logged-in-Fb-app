import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MouseEvent, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';

import { UserService } from '../user.service';
import { ProfileInterface } from '../../shared/models/profile.interface';
import { FilterService } from '../../shared/filter/filter.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
    providers: [GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit, OnDestroy {
    @ViewChild('map') map;
    /* Filter */
    subscriptionFilterValue$: Subscription;
    searchText: string;

    userLocation = {
        lat: 51.13527,
        lng: 30.57849
    };
    markers; // todo put a type

  constructor(private userService: UserService, private mapsWrapper: GoogleMapsAPIWrapper, private filterService: FilterService, private router: Router, private activatedRoute: ActivatedRoute) {
    //this.mapsWrapper = mapsWrapper;
    this.userService.userList$.subscribe(
        (data: ProfileInterface[]) => {
            let copyObg = Object.assign([], data);
            copyObg[0]['lat'] = 50.235612;
            copyObg[1]['lat'] = 50.265612;
            copyObg[2]['lat'] = 50.365612;
            copyObg[0]['lng'] = 30.234167;
            copyObg[1]['lng'] = 30.434172;
            copyObg[2]['lng'] = 30.444172;


            this.markers = copyObg.filter(el => typeof el.lat === 'number' && typeof el.lng === 'number' || el.lat != null || el.lng != null);
            this.markers.length = this.markers.length - 1;
        }
    );
  }

  ngOnInit() {
      this.subscriptionFilterValue$ = this.filterService.filterValue$.subscribe(
          (value: string) => {
              this.searchText = value;
          }
      );
      if (this.map) {
          this.setCurrentPosition();
      }

  }

  ngOnDestroy() {
      this.subscriptionFilterValue$.unsubscribe();
  }

    setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
            });
        }

    }

    clickedUserMarker(id: number): void {
      this.navigateToUserProfile(id);

    }

    navigateToUserProfile(id: number): void {
        this.router.navigate([`../profile/${id}`], {relativeTo: this.activatedRoute});
    }

    markerDragEnd(m, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

}
