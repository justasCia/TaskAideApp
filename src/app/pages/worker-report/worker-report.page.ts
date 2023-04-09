import { Component, OnInit } from '@angular/core';
import { WorkerReport } from 'src/app/models/reports/WorkerReport';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get("provider/workerReport").subscribe((response: any) => {
      this.report = response;
    })
  }

}
