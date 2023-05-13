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
    { title: 'Pagrindinis puslapis', url: '/', icon: 'home' },
    { title: 'Užsakymų užklausos', url: '/orders', queryParams: { status: "pending" }, icon: 'contract' },
    { title: 'Užsakymai derybų stadijoje', url: '/orders', queryParams: { status: "inNegotiation" }, icon: 'chatbubbles' },
    { title: 'Vykdomi užsakymai', url: '/orders', queryParams: { status: "confirmed" }, icon: 'clipboard' },
    { title: 'Visi užsakymai', url: '/orders', icon: 'list' },
    { title: 'Ataskaita', url: '/report', icon: 'barcode' },
  ]

  public companyPages = [
    { title: 'Pagrindinis puslapis', url: '/', icon: 'home' },
    { title: 'Užsakymų užklausos', url: '/orders', queryParams: { status: "pending" }, icon: 'contract' },
    { title: 'Užsakymai derbybų stadijoje', url: '/orders', queryParams: { status: "inNegotiation" }, icon: 'chatbubbles' },
    { title: 'Vykdomi užsakymai', url: '/orders', queryParams: { status: "confirmed" }, icon: 'clipboard' },
    { title: 'Visi užsakymai', url: '/orders', icon: 'list' },
    { title: 'Ataskaita', url: '/report', icon: 'barcode' },
    { title: 'Darbuotojai', url: '/workers', icon: 'people' },
  ]

  public companyWorkerPages = [
    { title: 'Pagrindinis puslapis', url: '/', icon: 'home' },
    { title: 'Priskirtos užsakymų užklausos', url: '/orders', queryParams: { status: "pending" }, icon: 'contract' },
    { title: 'Priskirti užsakymai derbybų stadijoje', url: '/orders', queryParams: { status: "inNegotiation" }, icon: 'chatbubbles' },
    { title: 'Priskirti vykdomi užsakymai', url: '/orders', queryParams: { status: "confirmed" }, icon: 'clipboard' },
    { title: 'Visi priskirti užsakymai', url: '/orders', icon: 'list' },
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
