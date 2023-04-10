import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderServicesPageRoutingModule } from './order-services-routing.module';

import { OrderServicesPage } from './order-services.page';
import { OrderFormComponent } from 'src/app/components/order-form/order-form.component';
import { CategorySelectionComponent } from 'src/app/components/order-form/category-selection/category-selection.component';
import { ServicesSelectionComponent } from 'src/app/components/order-form/services-selection/services-selection.component';
import { AdditionalInfoSelectionComponent } from 'src/app/components/order-form/additional-info-selection/additional-info-selection.component';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { ProviderSelectionComponent } from 'src/app/components/order-form/provider-selection/provider-selection.component';
import { OrderApprovalComponent } from 'src/app/components/order-form/order-approval/order-approval.component';
import { LocationInputModule } from 'src/app/components/location-input/location-input.module';
import { ProviderModalComponent } from 'src/app/components/provider-modal/provider-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderServicesPageRoutingModule,
    LocationInputModule
  ],
  declarations: [
    OrderServicesPage,
    OrderFormComponent,
    CategorySelectionComponent,
    ServicesSelectionComponent,
    AdditionalInfoSelectionComponent,
    ProviderSelectionComponent,
    CategoryComponent,
    OrderApprovalComponent,
    ProviderModalComponent
  ]
})
export class OrderServicesPageModule {}
