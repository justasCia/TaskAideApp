import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import User from 'src/app/models/User';
import { Register } from 'src/app/models/auth/Register';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-register-worker-modal',
  templateUrl: './register-worker-modal.component.html',
  styleUrls: ['./register-worker-modal.component.scss'],
})
export class RegisterWorkerModalComponent implements OnInit {
  register: Register = {
    firstName: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
  }
  constructor(private modalController: ModalController, private apiService: ApiService, private ionLoaderService: IonLoaderService) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async registerWorker() {
    await this.ionLoaderService.load(true);
    this.apiService.post("company/users", this.register).subscribe({
      next: (responseUser: User) => {
        this.successResponse(responseUser);
      },
      error: err => {
        this.errorResponse();
      }
    });
  }

  private successResponse(user: User) {
    this.ionLoaderService.load(false);
    this.modalController.dismiss(user);
  }

  private errorResponse() {
    //this.error = "Nepavyko pridėti banko sąskaitos";
    this.ionLoaderService.load(false);
  }

}
