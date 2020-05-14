import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  speed: number;

  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((x) => {
        this.latitude = x.coords.latitude;
        this.longitude = x.coords.longitude;
        this.altitude = x.coords.altitude;
        this.accuracy = x.coords.accuracy;
        this.speed = x.coords.speed;
      });
    }
  }
}
