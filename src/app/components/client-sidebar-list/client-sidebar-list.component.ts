import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/User';

@Component({
  selector: 'app-client-sidebar-list',
  templateUrl: './client-sidebar-list.component.html',
  styleUrls: ['./client-sidebar-list.component.scss'],
})
export class ClientSidebarListComponent implements OnInit {
  public appPages = [
    { title: 'Užsakyti paslaugas', url: '/order-services', icon: 'cart' },
    { title: 'Užsakytos paslaugos', url: '/orders', icon: 'calendar' },
    { title: 'Neapmokėtos paslaugos',  url: '/orders', queryParams: { status: "done", paid: false }, icon: 'barcode' },
  ];
  constructor() { }

  ngOnInit() {}

}
