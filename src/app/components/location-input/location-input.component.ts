import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { first } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import Location from '../../models/Location';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss'],
})
export class LocationInputComponent implements OnInit {
  searchQuery = '';
  places: any[] = [];
  showList: boolean = false;

  @Output() location = new EventEmitter<Location>();
  @Input() inputLocation?: Location;

  constructor(private geoCoder: MapGeocoder, private locationService: LocationService) { }

  searchPlaces(event: any) {
    let input = event.target.value;

    if (input) {
      let autocomplete = new google.maps.places.AutocompleteService();
      autocomplete.getPlacePredictions({ input }, (predictions: any) => {
        this.places = predictions;
      });
    } else {
      this.places = [];
    }

    if (this.places.length > 0 && !this.places.includes(this.searchQuery)) {
      this.showList = true;
    } else {
      this.showList = false;
    }
  }

  selectPlace(place: any) {
    this.searchQuery = place.description;
    this.places = [];
    this.showList = false;

    this.geoCoder.geocode({ address: place.description }).subscribe((results) => {
      let latitude = results.results[0].geometry.location.lat();
      let longitude = results.results[0].geometry.location.lng();
      const location: Location = {
        x: longitude,
        y: latitude,
        placeId: place.place_id
      };
      this.location.emit(location);
    });
  }

  ngOnInit() {
    if (this.inputLocation) {
      this.locationService.getAddress(this.inputLocation).then(adress => {
        this.searchQuery = adress;
      })
    }
  }
}
