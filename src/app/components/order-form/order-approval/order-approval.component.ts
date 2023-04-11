import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { OrderFormService } from 'src/app/services/order-form.service';

@Component({
  selector: 'app-order-approval',
  templateUrl: './order-approval.component.html',
  styleUrls: ['./order-approval.component.scss'],
})
export class OrderApprovalComponent implements OnInit {
  address: string;

  @Output() order = new EventEmitter();

  constructor(public orderFormService: OrderFormService, private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getAddress(this.orderFormService.additionalInfo!.address!).then(address => {
      this.address = address;
    });
    //this.getAddress();
  }

  orderEmit() {
    this.order.emit();
  }

  getAddress() {
    const geocoder = new google.maps.Geocoder();
    const address = this.orderFormService.additionalInfo!.address;
    const latlng = {
      lat: address!.y,
      lng: address!.x,
    };
    geocoder.geocode({ location: latlng }).then(response => {
      this.address = response.results.filter(x => x.place_id === address!.placeId)[0].formatted_address
    });
  }
}
