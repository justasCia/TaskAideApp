import { Injectable } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { first, tap } from 'rxjs';
import Location from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private geoCoder: MapGeocoder) { }

  getAddress(location: Location) {
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: location.y,
      lng: location.x,
    };
    return geocoder.geocode({ location: latlng }).then(response => {
      return response.results.filter(x => x.place_id === location.placeId)[0].formatted_address
    });
  }
}

