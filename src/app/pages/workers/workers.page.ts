import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RegisterWorkerModalComponent } from 'src/app/components/register-worker-modal/register-worker-modal.component';
import User from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.page.html',
  styleUrls: ['./workers.page.scss'],
})
export class WorkersPage implements OnInit {
  workers: User[] = [];
  constructor( private apiService: ApiService, private modalController: ModalController) { }
  

  ngOnInit() {
    this.apiService.get("company/users").subscribe((response: any) => {
      this.workers = response;
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
