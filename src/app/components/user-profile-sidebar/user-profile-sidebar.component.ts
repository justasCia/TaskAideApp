import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/User';

@Component({
  selector: 'app-user-profile-sidebar',
  templateUrl: './user-profile-sidebar.component.html',
  styleUrls: ['./user-profile-sidebar.component.scss'],
})
export class UserProfileSidebarComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {}

}
