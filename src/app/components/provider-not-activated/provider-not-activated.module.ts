import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProviderNotActivatedComponent } from './provider-not-activated.component';



@NgModule({
  declarations: [ProviderNotActivatedComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ProviderNotActivatedComponent]
})
export class ProviderNotActivatedModule { }
