import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { ProviderNotActivatedModule } from 'src/app/components/provider-not-activated/provider-not-activated.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    ProviderNotActivatedModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
