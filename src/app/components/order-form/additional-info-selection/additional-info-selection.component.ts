import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-additional-info-selection',
  templateUrl: './additional-info-selection.component.html',
  styleUrls: ['./additional-info-selection.component.scss'],
})
export class AdditionalInfoSelectionComponent implements OnInit {
  @Output() infoSubmitted = new EventEmitter<{location: string, preferredDate: Date, additionalInfo: string, pictures: File[] }>();

  location: string;
  preferredDate: Date;
  additionalInfo: string;
  pictures: File[];

  onPictureSelect(event: any) {
    this.pictures = [...event.target.files];
  }

  submit() {
    this.infoSubmitted.emit({location: this.location, preferredDate: this.preferredDate, additionalInfo: this.additionalInfo, pictures: this.pictures});
  }
  
  constructor() { }

  ngOnInit() {}
}
