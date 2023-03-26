import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderInfoPage } from './provider-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderInfoPageRoutingModule {}
