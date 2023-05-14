import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from '../../models/auth/Register';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-register-provider',
  templateUrl: './register-provider.page.html',
  styleUrls: ['./register-provider.page.scss'],
})
export class RegisterProviderPage implements OnInit {
  register: Register = {
    firstName: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
  };
  error = false;
  
  constructor(private authService: AuthService, private ionLoaderService: IonLoaderService) { }

  ngOnInit() {
  }

  async registerWithCredentials() {
    await this.ionLoaderService.load(true);
    this.authService.registerProvider(this.register).subscribe({
      next: () => {
        this.authService.login(this.register).subscribe(response => {
          window.location.href = "/";
        })
      },
      error: error => {
        console.log(error);
        this.error = true;
        this.ionLoaderService.load(false);
      }
    })
  }
}
