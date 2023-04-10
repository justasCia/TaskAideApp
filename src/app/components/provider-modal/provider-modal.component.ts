import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Provider from 'src/app/models/Provider';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.scss'],
})
export class ProviderModalComponent{
  @Input() provider: Provider;

  constructor(private modalController: ModalController) {}

  async dismiss() {
    await this.modalController.dismiss();
  }

  // async selectProvider() {
  //   await this.modalController.dismiss(this.provider);
  // }
}
