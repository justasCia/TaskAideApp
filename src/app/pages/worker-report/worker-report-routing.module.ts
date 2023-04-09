import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerReportPage } from './worker-report.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerReportPageRoutingModule {}
