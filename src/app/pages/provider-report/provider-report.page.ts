import { Component, OnInit } from '@angular/core';
import { ProviderReport } from 'src/app/models/reports/ProviderReport';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-provider-report',
  templateUrl: './provider-report.page.html',
  styleUrls: ['./provider-report.page.scss'],
})
export class ProviderReportPage implements OnInit {
  report: ProviderReport;
  isExpanded = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get("provider/report").subscribe((response: any) => {
      this.report = response;
    })
  }

}
