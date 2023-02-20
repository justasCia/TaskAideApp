import { Component, OnInit } from '@angular/core';

interface Login {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: Login = {
    email: '',
    password: ''
  };
  submitted: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  logInWithCredentials() {
    this.submitted = true
    console.log(this.login);
  }

}
