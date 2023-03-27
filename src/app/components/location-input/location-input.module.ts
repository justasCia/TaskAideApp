import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationInputComponent } from './location-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LocationInputComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [LocationInputComponent]
})
export class LocationInputModule { }
