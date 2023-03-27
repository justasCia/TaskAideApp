import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/User';

@Component({
  selector: 'app-worker-sidebar-list',
  templateUrl: './worker-sidebar-list.component.html',
  styleUrls: ['./worker-sidebar-list.component.scss'],
})
export class WorkerSidebarListComponent implements OnInit {
  @Input() user: User;
  public appPages = [
    { title: 'Paslaugų užklausos', url: '/orders', queryParams: {status: "pending"}, icon: 'contract' },
    { title: 'Darbai', url: '/orders', icon: 'calendar' },
    { title: 'Sąskaitos', url: '/folder/Sąskaitos', icon: 'barcode' },
    { title: 'Darbastalis', url: '/folder/Darbastalis', icon: 'apps' },
    { title: 'Paslaugos', url: '/folder/Paslaugos', icon: 'list' },
    { title: 'Darbai', url: '/folder/Darbai', icon: 'calendar' },
    { title: 'Sąskaitos', url: '/folder/Sąskaitos', icon: 'barcode' },
  ];
  constructor() { }

  ngOnInit() {}

}
