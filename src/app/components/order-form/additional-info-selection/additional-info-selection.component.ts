import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import AdditionalInfo from 'src/app/models/orders/AdditionalInfo';
import Location from '../../../models/Location';


@Component({
  selector: 'app-additional-info-selection',
  templateUrl: './additional-info-selection.component.html',
  styleUrls: ['./additional-info-selection.component.scss'],
})
export class AdditionalInfoSelectionComponent implements OnInit {
  today: string;
  
  additionalInfo: AdditionalInfo = {
    additionalInformation: "",
    pictures: []
  };
  @Output() infoSubmitted = new EventEmitter<AdditionalInfo>();

  onPictureSelect(event: any) {
    this.additionalInfo.pictures = [...event.target.files];
  }

  collectAditionalInfo() {
    this.infoSubmitted.emit(this.additionalInfo);
  }

  setAddress(address: Location) {
    this.additionalInfo.address = address;
  }

  constructor() { }

  ngOnInit() {
    const now = new Date();
    this.today = now.toISOString()
  }
}
