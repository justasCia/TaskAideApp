import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/services/Category';
import { OrderFormService } from 'src/app/services/order-form.service';
import AdditionalInfo from 'src/app/models/orders/AdditionalInfo';
import Service from 'src/app/models/services/Service';
import Provider from 'src/app/models/Provider';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {

  constructor(public orderFormService: OrderFormService) { }

  selectCategory(category: Category) {
    this.orderFormService.selectCategory(category);
  }

  selectServices(services: Service[]) {
    this.orderFormService.selectServices(services);
  }

  collectAdditionalInformation(additionalInfo: AdditionalInfo) {
    this.orderFormService.collectAdditionalInfo(additionalInfo);
  }

  selectProvider(provider: Provider) {
    this.orderFormService.selectProvider(provider);
  }

  previousStep() {
    this.orderFormService.step--;
  }

  order() {
    console.log({
      services: this.orderFormService.selectedServices,
      ...this.orderFormService.additionalInfo,
      providerId: this.orderFormService.selectedProvider!.id
    });
  }

  

  ngOnInit() {}

}
