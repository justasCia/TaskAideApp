import { Injectable } from '@angular/core';
import Category from '../models/services/Category';
import ServiceWithQuantity from '../models/orders/ServiceWithQuantity';
import AdditionalInfo from '../models/orders/AdditionalInfo';
import Service from '../models/services/Service';
import Provider from '../models/Provider';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  step = 1;
  selectedCategory: Category;
  selectedServices: Service[] = [];
  additionalInfo: AdditionalInfo;
  selectedProvider?: Provider;
  
  constructor() { }
  
  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.step++;
  }

  selectServices(services: Service[]) {
    this.selectedServices = services;
    this.step++;
  }

  collectAdditionalInfo(info: AdditionalInfo) {
    this.additionalInfo = info;
    this.step++;
  }

  selectProvider(provider: Provider) {
    this.selectedProvider = provider;
  }

  previousStep() {
    this.step--;
  }
}
