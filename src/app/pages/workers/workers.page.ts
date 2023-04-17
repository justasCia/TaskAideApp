import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RegisterWorkerModalComponent } from 'src/app/components/register-worker-modal/register-worker-modal.component';
import User from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.page.html',
  styleUrls: ['./workers.page.scss'],
})
export class WorkersPage implements OnInit {
  workers: User[] = [];
  providerActivated: boolean = true; 
  constructor(private apiService: ApiService, private modalController: ModalController, private ionLoaderService: IonLoaderService) { }


  async ngOnInit() {
    await this.ionLoaderService.load(true);
    this.apiService.get("company/users").subscribe({
      next: (response: any) => {
        this.workers = response;
        this.ionLoaderService.load(false);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error && error.status === 404) {
          this.providerActivated = false;
        }
        this.ionLoaderService.load(false);
      }
    })
  }

  async openRegisterWorkerModal() {
    const modal = await this.modalController.create({
      component: RegisterWorkerModalComponent,
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.workers.push(result.data);
      }
    });

    return await modal.present();
  }

}
