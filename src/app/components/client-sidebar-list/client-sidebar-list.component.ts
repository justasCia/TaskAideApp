import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/User';

@Component({
  selector: 'app-client-sidebar-list',
  templateUrl: './client-sidebar-list.component.html',
  styleUrls: ['./client-sidebar-list.component.scss'],
})
export class ClientSidebarListComponent implements OnInit {
  @Input() user: User;
  public appPages = [
    { title: 'Užsakyti paslaugas', url: '/order-services', icon: 'cart' },
    { title: 'Užsakytos paslaugos', url: '/orders', icon: 'calendar' },
    { title: 'Sąskaitos', url: '/folder/Sąskaitos', icon: 'barcode' },
  ];
  constructor() { }

  ngOnInit() {}

}
