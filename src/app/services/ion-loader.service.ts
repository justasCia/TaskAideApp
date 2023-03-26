import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {

  constructor(private loadingController: LoadingController) { }

  load(load: boolean) {
    if (load) {
      this.loadingController.create().then(response => response.present());
    } else {
      this.loadingController.dismiss();
    }
  }
}
