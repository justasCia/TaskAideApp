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
    { title: 'Darbastalis', url: '/folder/Darbastalis', icon: 'apps' },
    { title: 'Paslaugos', url: '/folder/Paslaugos', icon: 'list' },
    { title: 'Darbai', url: '/folder/Darbai', icon: 'calendar' },
    { title: 'Sąskaitos', url: '/folder/Sąskaitos', icon: 'barcode' },
  ];
  constructor() { }

  ngOnInit() {}

}
