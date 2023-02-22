import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from '../../models/auth/Register';

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
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerWithCredentials() {
    this.authService.register(this.register).subscribe(response => {
      console.log(response);
    }, (error: any) => {
      console.log(error.error);
    })
  }

}
