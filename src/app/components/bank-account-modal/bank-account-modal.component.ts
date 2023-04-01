import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { error } from 'console';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-bank-account-modal',
  templateUrl: './bank-account-modal.component.html',
  styleUrls: ['./bank-account-modal.component.scss'],
})
export class BankAccountModalComponent {
  @Input() update: string;
  bankAccount: string;
  error: string = "";

  constructor(private modalController: ModalController, private apiService: ApiService, private ionLoaderService: IonLoaderService) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async saveBankAccount() {
    this.error = "";
    if (this.update) {
      await this.updateBankAccount();
    } else {
      await this.createBankAccount();
    }
  }

  private async createBankAccount() {
    await this.ionLoaderService.load(true);
    this.apiService.post("provider/bankAccount", this.bankAccount).subscribe({
      next: (provider: any) => {
        this.successResponse(provider);
      },
      error: () => {
        this.errorResponse();
      }
    });
  }

  

  private async updateBankAccount() {
    await this.ionLoaderService.load(true);
    this.apiService.put("provider/bankAccount", this.bankAccount).subscribe({
      next: (provider: any) => {
        this.successResponse(provider);
      },
      error: () => {
        this.errorResponse();
      }
    });
  }

  private successResponse(provider: any) {
    this.ionLoaderService.load(false);
    this.modalController.dismiss(provider);
  }

  private errorResponse() {
    this.error = "Nepavyko pridėti banko sąskaitos";
    this.ionLoaderService.load(false);
  }
}
