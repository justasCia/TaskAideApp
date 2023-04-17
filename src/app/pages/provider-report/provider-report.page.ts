import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProviderReport } from 'src/app/models/reports/ProviderReport';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-provider-report',
  templateUrl: './provider-report.page.html',
  styleUrls: ['./provider-report.page.scss'],
})
export class ProviderReportPage implements OnInit {
  report: ProviderReport;
  isExpanded = false;
  startDate?: Date;
  endDate?: Date;
  providerActivated: boolean = true;

  constructor(private apiService: ApiService, private ionLoaderService: IonLoaderService) { }

  ngOnInit() {
    this.getProviderReport();
  }

  clearFilters() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.getProviderReport();
  }

  async getProviderReport() {
    await this.ionLoaderService.load(true);
    let url = "provider/report";
    if (this.startDate && this.endDate) {
      url += `?startDate=${new Date(this.startDate).toISOString()}&endDate=${new Date(this.endDate).toISOString()}`;
    } else if (this.startDate) {
      url += `?startDate=${new Date(this.startDate).toISOString()}`;
    } else if (this.endDate) {
      url += `?endDate=${new Date(this.endDate).toISOString()}`;
    }

    this.apiService.get(url).subscribe({
      next: (response: any) => {
        this.report = response;
        this.ionLoaderService.load(false);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error && error.status === 404) {
          this.providerActivated = false;
        }
        this.ionLoaderService.load(false);
      }
    });
  }



}
