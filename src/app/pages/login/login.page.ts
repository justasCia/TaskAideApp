import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../../models/auth/Login';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {
  login: Login = {
    email: '',
    password: ''
  };
  error = false;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private ionLoaderService: IonLoaderService
  ) { }

  ionViewWillEnter(): void {
  }

  ngOnInit() {
  }

  async logInWithCredentials() {
    await this.ionLoaderService.load(true);
    this.authService.login(this.login)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          window.location.href = "/";
        },
        error: error => {
          this.error = true;
          this.ionLoaderService.load(false);
        },
      })
  }

}
