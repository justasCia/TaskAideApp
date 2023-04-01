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
    { title: 'Paslaugos derbybų stadijoje', url: '/orders', queryParams: {status: "inNegotiation"}, icon: 'chatbubbles' },
    { title: 'Vykdomi darbai', url: '/orders', queryParams: {status: "confirmed"}, icon: 'clipboard' },
    { title: 'Visi darbai', url: '/orders', icon: 'list' },
    { title: 'Ataskaitos', url: '/folder/Ataskaitos', icon: 'barcode' },
    { title: 'Darbastalis', url: '/folder/Darbastalis', icon: 'apps' },
    { title: 'Darbai', url: '/folder/Darbai', icon: 'calendar' },
  ];
  constructor() { }

  ngOnInit() {}

}
