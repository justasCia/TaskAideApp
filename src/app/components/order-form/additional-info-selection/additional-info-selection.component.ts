import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import AdditionalInfo from 'src/app/models/orders/AdditionalInfo';
import Location from '../../../models/Location';


@Component({
  selector: 'app-additional-info-selection',
  templateUrl: './additional-info-selection.component.html',
  styleUrls: ['./additional-info-selection.component.scss'],
})
export class AdditionalInfoSelectionComponent implements OnInit {
  minStartDate: string;
  maxStartDate: string;
  minEndDate: string;
  maxEndDate: string;

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

  constructor() {
    const today = new Date();
    this.minStartDate = formatDate(today, 'YYYY-MM-dd', 'en');
    this.maxStartDate = '2100-12-31';
    this.minEndDate = this.minStartDate;
    this.maxEndDate = '2100-12-31';
    this.additionalInfo.startDate = this.minStartDate;
    this.additionalInfo.endDate = this.minStartDate; // set initial value to minStartDate
  }

  ngOnInit() {

  }

  onStartDateChange() {
    if (this.additionalInfo.startDate! > this.additionalInfo.endDate!) {
      this.additionalInfo.endDate = this.additionalInfo.startDate;
    }
  }

  onEndDateChange() {
    if (this.additionalInfo.endDate! < this.additionalInfo.startDate!) {
      this.additionalInfo.startDate = this.additionalInfo.endDate;
    }
  }
}