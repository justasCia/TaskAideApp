import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from '../../models/auth/Register';

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
    //repeatPassword: ''
  }
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerWithCredentials() {
    this.authService.registerProvider(this.register).subscribe(response => {
      console.log(response);
    }, (error: any) => {
      console.log(error.error);
    })
  }

}
