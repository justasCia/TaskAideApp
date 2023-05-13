import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/User';

@Component({
  selector: 'app-client-sidebar-list',
  templateUrl: './client-sidebar-list.component.html',
  styleUrls: ['./client-sidebar-list.component.scss'],
})
export class ClientSidebarListComponent implements OnInit {
  public appPages = [
    { title: 'Pagrindinis puslapis', url: '/', icon: 'home' },
    { title: 'Užsakyti paslaugas', url: '/order-services', icon: 'cart' },
    { title: 'Mano užsakymai', url: '/orders', icon: 'calendar' },
    { title: 'Neapmokėti užsakymai',  url: '/orders', queryParams: { status: "done", paid: false }, icon: 'barcode' },
  ];
  constructor() { }

  ngOnInit() {}

}
