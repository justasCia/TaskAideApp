import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Provider from 'src/app/models/Provider';
import { ApiService } from 'src/app/services/api.service';
import { OrderFormService } from 'src/app/services/order-form.service';
import OrderRequest from '../../../models/orders/OrderRequest';
import { ModalController } from '@ionic/angular';
import { ProviderModalComponent } from '../../provider-modal/provider-modal.component';

@Component({
  selector: 'app-provider-selection',
  templateUrl: './provider-selection.component.html',
  styleUrls: ['./provider-selection.component.scss'],
})
export class ProviderSelectionComponent implements OnInit {
  providers: Provider[];
  selectedProvider?: Provider;

  nextDisabled: boolean = true;

  @Output() provider = new EventEmitter<Provider>();

  constructor(private apiService: ApiService, private orderFormService: OrderFormService, private modalController: ModalController) { }

  getAvailableProviders() {
    const services = this.orderFormService.selectedServices.map(s => ({ service: s }));
    const requestBody: OrderRequest = {
      ...this.orderFormService.additionalInfo,
      services: services,
    }
    this.apiService.post("bookings/providers", requestBody).subscribe((response: Provider[]) => {
      this.providers = response;
    });
  }

  selectProvider(provider: Provider): void {
    this.selectedProvider = provider;
    this.nextDisabled = false;
    this.provider.emit(this.selectedProvider);
    this.openProviderModal(provider);
  }

  next() {
    this.orderFormService.step++;
  }

  ngOnInit() {
    this.getAvailableProviders();
  }

  async openProviderModal(provider: Provider) {
    const modal = await this.modalController.create({
      component: ProviderModalComponent,
      componentProps: {
        provider: provider,
      },
    });
    await modal.present();
  }

}
