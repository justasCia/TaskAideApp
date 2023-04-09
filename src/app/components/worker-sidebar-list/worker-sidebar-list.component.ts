import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/User';

@Component({
  selector: 'app-worker-sidebar-list',
  templateUrl: './worker-sidebar-list.component.html',
  styleUrls: ['./worker-sidebar-list.component.scss'],
})
export class WorkerSidebarListComponent implements OnInit {
  @Input() role: string;
  public providerPages = [
    { title: 'Paslaugų užklausos', url: '/orders', queryParams: { status: "pending" }, icon: 'contract' },
    { title: 'Paslaugos derbybų stadijoje', url: '/orders', queryParams: { status: "inNegotiation" }, icon: 'chatbubbles' },
    { title: 'Vykdomi darbai', url: '/orders', queryParams: { status: "confirmed" }, icon: 'clipboard' },
    { title: 'Visi darbai', url: '/orders', icon: 'list' },
    { title: 'Ataskaita', url: '/report', icon: 'barcode' },
  ]

  public companyPages = [
    { title: 'Paslaugų užklausos', url: '/orders', queryParams: { status: "pending" }, icon: 'contract' },
    { title: 'Paslaugos derbybų stadijoje', url: '/orders', queryParams: { status: "inNegotiation" }, icon: 'chatbubbles' },
    { title: 'Vykdomi darbai', url: '/orders', queryParams: { status: "confirmed" }, icon: 'clipboard' },
    { title: 'Visi darbai', url: '/orders', icon: 'list' },
    { title: 'Ataskaita', url: '/report', icon: 'barcode' },
    { title: 'Daruotojai', url: '/workers', icon: 'people' },
  ]

  public companyWorkerPages = [
    { title: 'Priskirtos paslaugų užklausos', url: '/orders', queryParams: { status: "pending" }, icon: 'contract' },
    { title: 'Priskirtos paslaugos derbybų stadijoje', url: '/orders', queryParams: { status: "inNegotiation" }, icon: 'chatbubbles' },
    { title: 'Priskirti vykdomi darbai', url: '/orders', queryParams: { status: "confirmed" }, icon: 'clipboard' },
    { title: 'Visi priskirti darbai', url: '/orders', icon: 'list' },
    { title: 'Ataskaita', url: '/worker-report', icon: 'barcode' },
  ]
  public appPages: { title: string, url: string, queryParams?: any, icon: string }[] = [];
  constructor() { }

  ngOnInit() {
    switch (this.role) {
      case 'Provider':
        this.appPages = this.providerPages;
        break;
      case 'Company':
        this.appPages = this.companyPages;
        break;
      case 'CompanyWorker':
        this.appPages = this.companyWorkerPages;
        break;
      default:
        break;
    }
  }

}
