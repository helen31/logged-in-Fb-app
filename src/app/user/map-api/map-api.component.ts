import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map-api',
  templateUrl: './map-api.component.html',
  styleUrls: ['./map-api.component.scss']
})

export class MapApiComponent implements OnInit {
  private map: any;
  infoWindow;

  constructor() { }

  ngOnInit() {

    this.initMap();
  }

  initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.4303885, lng: 30.5046767},
          zoom: 12
      });
      this.infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              const marker = new google.maps.Marker({
                  position: pos,
                  map: this.map,
                  title: 'Hello World!'
              });
              console.log('pos--', pos);

              this.infoWindow.setPosition(pos);
              this.infoWindow.setContent('Location of current user found.');
              this.infoWindow.open(this.map);

              this.map.setCenter(pos);
          }, () => {
              this.handleLocationError(true, this.infoWindow, this.map.getCenter());
          });
      } else {
          // Browser doesn't support Geolocation
          this.handleLocationError(false, this.infoWindow, this.map.getCenter());
      }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(this.map);
  }
}
