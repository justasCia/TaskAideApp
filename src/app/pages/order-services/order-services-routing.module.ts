import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderServicesPage } from './order-services.page';

const routes: Routes = [
  {
    path: '',
    component: OrderServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderServicesPageRoutingModule {}
