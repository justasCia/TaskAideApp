import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {

  constructor(private loadingController: LoadingController) { }

  async load(load: boolean) {
    if (load) {
      return await this.loadingController.create().then(response => {
          return response.present()
      });
    } else {
      return await this.loadingController.dismiss();
    }
  }
}
