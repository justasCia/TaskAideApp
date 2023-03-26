import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderInfoPageRoutingModule } from './provider-info-routing.module';

import { ProviderInfoPage } from './provider-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderInfoPageRoutingModule
  ],
  declarations: [ProviderInfoPage]
})
export class ProviderInfoPageModule {}
