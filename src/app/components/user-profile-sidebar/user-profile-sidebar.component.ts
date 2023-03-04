import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/User';

@Component({
  selector: 'app-user-profile-sidebar',
  templateUrl: './user-profile-sidebar.component.html',
  styleUrls: ['./user-profile-sidebar.component.scss'],
})
export class UserProfileSidebarComponent {
  @Input() user: User;

  isDropdownOpen = false;
  dropdownIcon = 'chevron-down-outline';

  constructor() { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.dropdownIcon = this.isDropdownOpen ? 'arrow-up' : 'arrow-down';
  }
}
