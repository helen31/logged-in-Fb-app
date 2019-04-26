import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';

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
    map;
    /* Filter */
    subscriptionFilterValue$: Subscription;
    searchText: string;

    userLocation = {
        lat: 50, lon: 30
    };
    markers: ProfileInterface[];


    constructor(private userService: UserService, private filterService: FilterService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.userService.userList$.subscribe(
            (data: ProfileInterface[]) => {
                let copyObg = Object.assign([], data);
                copyObg[0]['lat'] = 50.235612;
                copyObg[1]['lat'] = 50.265612;
                copyObg[2]['lat'] = 50.365612;
                copyObg[0]['lon'] = 30.234167;
                copyObg[1]['lon'] = 30.434172;
                copyObg[2]['lon'] = 30.444172;

                /* filter user list with values: null, 'null' */
                this.markers = copyObg.filter(el => (el.lat != 'null' && el.lon != 'null') && (el.lat !== null && el.lon !== null));
            }
        );
    }

    ngOnInit() {
        this.subscriptionFilterValue$ = this.filterService.filterValue$.subscribe(
            (value: string) => {
                this.searchText = value;
            }
        );
    }

    ngOnDestroy() {
        this.subscriptionFilterValue$.unsubscribe();
    }

    /* User */

    setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                this.userLocation = {lat: position.coords.latitude, lon: position.coords.longitude};
                this.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            });
        } else {
            console.log('No geolocation!');
        }

    }

    // Update user Location
    updateUserLocation() {
        navigator.geolocation.watchPosition(async (position) => {
            this.userLocation = {lat: position.coords.latitude, lon: position.coords.longitude};
            //this.setCurrentPosition();
        });
    }

    navigateToUserProfile(id: number): void {
        this.router.navigate([`../profile/${id}`], {relativeTo: this.activatedRoute});
    }


    /* Map */

    onMapReady(map) {
        this.map = map;

        this.setCurrentPosition();
        //this.updateUserLocation();
    }

    onMapCenterChange(e) {
        //console.log('center changed', e);
    }

    clickedUserMarker(id: number): void {
        this.navigateToUserProfile(id);
    }

    markerDragEnd(m, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

}
