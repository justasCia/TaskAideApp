import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/auth/Register';
import { RegisterCompany } from 'src/app/models/auth/RegisterCompany';
import { AuthService } from 'src/app/services/auth.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {
  register: RegisterCompany = {
    companyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    //repeatPassword: ''
  }
  
  constructor(private authService: AuthService, private ionLoaderService: IonLoaderService) { }

  ngOnInit() {
  }

  async registerWithCredentials() {
    await this.ionLoaderService.load(true);
    this.authService.registerCompany(this.register).subscribe({
      next: () => {
        this.authService.login(this.register).subscribe(response => {
          window.location.href = "/";
        })
      },
      error: error => {
        console.log(error);
        this.ionLoaderService.load(false);
      }
    })
  }
}
