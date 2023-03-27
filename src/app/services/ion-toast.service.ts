import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonToastService {
  constructor(private toastController: ToastController) { }

  async showSuccess(message: string, closeable?: boolean) {
    if (!closeable) {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000,
        color: 'success',
      });
      toast.present();
    }

    const toast = await this.toastController.create({
      message: message,
      color: 'success',
      buttons: [
        {
          icon: "close",
        }
      ]
    })
    toast.present();
  }

  async showWarning(message: string, closeable?: boolean) {
    if (!closeable) {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000,
        color: 'warning',
      });
      toast.present();
    }

    const toast = await this.toastController.create({
      message: message,
      color: 'warning',
      buttons: [
        {
          icon: "close",
        }
      ]
    })
    toast.present();
  }

  async showDanger(message: string, closeable?: boolean) {
    if (!closeable) {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    }

    const toast = await this.toastController.create({
      message: message,
      color: 'danger',
      buttons: [
        {
          icon: "close",
        }
      ]
    })
    toast.present();
  }
}
