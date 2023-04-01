import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user: User

  constructor(private apiService: ApiService, private ionLoaderService: IonLoaderService) { }

  async ngOnInit() {
    //await this.ionLoaderService.load(true);
    this.apiService.get("user/profile").subscribe((userResponse: any) => {
      this.user = userResponse;
      this.ionLoaderService.load(false);
    });
  }

}
