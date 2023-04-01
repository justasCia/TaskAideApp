import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProviderInfoComponent } from 'src/app/components/provider-info/provider-info.component';
import { LocationInputModule } from 'src/app/components/location-input/location-input.module';
import { UserInfoComponent } from 'src/app/components/user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    LocationInputModule
  ],
  declarations: [
    ProfilePage,
    ProviderInfoComponent,
    UserInfoComponent]
})
export class ProfilePageModule { }
