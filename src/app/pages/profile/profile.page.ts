import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  providerLooking: boolean = false;
  companyLooking: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.providerLooking = (this.authService.userValue != null && this.authService.userValue.role != null && this.authService.userValue.role.includes("Provider"))
    this.companyLooking = (this.authService.userValue != null && this.authService.userValue.role != null && this.authService.userValue.role.includes("Company"))
  }

}
