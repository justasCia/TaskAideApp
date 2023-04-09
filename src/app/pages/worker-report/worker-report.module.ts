import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerReportPageRoutingModule } from './worker-report-routing.module';

import { WorkerReportPage } from './worker-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerReportPageRoutingModule
  ],
  declarations: [WorkerReportPage]
})
export class WorkerReportPageModule {}
