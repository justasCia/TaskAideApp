import { Component, OnInit } from '@angular/core';
import { WorkerReport } from 'src/app/models/reports/WorkerReport';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-worker-report',
  templateUrl: './worker-report.page.html',
  styleUrls: ['./worker-report.page.scss'],
})
export class WorkerReportPage implements OnInit {
  report: WorkerReport;
  isExpanded = false;
  startDate?: Date;
  endDate?: Date;
  constructor(private apiService: ApiService, private ionLoaderService: IonLoaderService) { }

  ngOnInit() {
    this.getWorkerReport();
  }

  clearFilters() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.getWorkerReport();
  }

  async getWorkerReport() {
    await this.ionLoaderService.load(true);
    let url = "provider/workerReport";
    if (this.startDate && this.endDate) {
      url += `?startDate=${new Date(this.startDate).toISOString()}&endDate=${new Date(this.endDate).toISOString()}`;
    } else if (this.startDate) {
      url += `?startDate=${new Date(this.startDate).toISOString()}`;
    } else if (this.endDate) {
      url += `?endDate=${new Date(this.endDate).toISOString()}`;
    }

    this.apiService.get(url).subscribe((response: any) => {
      this.report = response;
      this.ionLoaderService.load(false);
    });
  }
}
