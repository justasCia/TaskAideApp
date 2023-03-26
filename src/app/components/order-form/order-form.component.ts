import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/services/Category';
import { OrderFormService } from 'src/app/services/order-form.service';
import AdditionalInfo from 'src/app/models/orders/AdditionalInfo';
import Service from 'src/app/models/services/Service';
import User from 'src/app/models/Provider';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {

  constructor(public orderFormService: OrderFormService, private ionLoaderService: IonLoaderService) { }

  selectCategory(category: Category) {
    this.orderFormService.selectCategory(category);
  }

  selectServices(services: Service[]) {
    this.orderFormService.selectServices(services);
  }

  collectAdditionalInformation(additionalInfo: AdditionalInfo) {
    this.orderFormService.collectAdditionalInfo(additionalInfo);
  }

  selectProvider(provider: User) {
    this.orderFormService.selectProvider(provider);
  }

  previousStep() {
    this.orderFormService.step--;
  }

  order() {
    this.ionLoaderService.load(true);
    this.orderFormService.order().subscribe(response => {
      console.log(response);
      this.ionLoaderService.load(false);
    });
  }
  ngOnInit() {}

}
