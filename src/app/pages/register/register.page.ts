import { Component, OnInit } from '@angular/core';

interface Register {
  firstName: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  password: string,
  repeatPassword: string
}

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
    repeatPassword: ''
  }
  constructor() { }

  ngOnInit() {
  }

  registerWithCredentials() {
    console.log(this.register);
  }

}
