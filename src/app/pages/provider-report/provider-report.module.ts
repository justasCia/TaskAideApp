import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderReportPageRoutingModule } from './provider-report-routing.module';

import { ProviderReportPage } from './provider-report.page';
import { ProviderNotActivatedModule } from 'src/app/components/provider-not-activated/provider-not-activated.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderReportPageRoutingModule,
    ProviderNotActivatedModule
  ],
  declarations: [ProviderReportPage]
})
export class ProviderReportPageModule {}
