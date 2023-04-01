import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from '../../models/auth/Register';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: Register = {
    firstName: '',
    lastname: '',
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
    this.authService.register(this.register).subscribe({
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
