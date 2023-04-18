import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private apiService: ApiService, private ionLoaderService: IonLoaderService) { }

  async ngOnInit() {
    debugger;
    if (this.authService.userValue) {
      debugger;
      this.loggedIn = true;
    }
    if (this.loggedIn) {
      
    }
  }
}
