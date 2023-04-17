import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkersPageRoutingModule } from './workers-routing.module';

import { WorkersPage } from './workers.page';
import { RegisterWorkerModalComponent } from 'src/app/components/register-worker-modal/register-worker-modal.component';
import { ProviderNotActivatedModule } from 'src/app/components/provider-not-activated/provider-not-activated.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkersPageRoutingModule,
    ProviderNotActivatedModule
  ],
  declarations: [WorkersPage, RegisterWorkerModalComponent]
})
export class WorkersPageModule {}
