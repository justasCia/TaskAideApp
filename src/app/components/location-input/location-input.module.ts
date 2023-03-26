import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationInputComponent } from './location-input.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LocationInputComponent],
  imports: [
    CommonModule
  ],
  exports: [LocationInputComponent]
})
export class LocationInputModule { }
