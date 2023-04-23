import { Injectable } from '@angular/core';
import Category from '../models/services/Category';
import AdditionalInfo from '../models/orders/AdditionalInfo';
import Service from '../models/services/Service';
import Provider from '../models/Provider';
import { ApiService } from './api.service';
import PostOrder from '../models/orders/PostOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  step = 1;
  selectedCategory: Category;
  selectedServices: Service[] = [];
  additionalInfo?: AdditionalInfo;
  selectedProvider?: Provider;

  constructor(private apiService: ApiService) { }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.step++;
  }

  selectServices(services: Service[]) {
    //this.selectedServices = services;
    this.selectedServices = services.filter(s => s.categoryId == this.selectedCategory.id);
    this.step++;
  }

  collectAdditionalInfo(info: AdditionalInfo) {
    this.additionalInfo = info;
    this.step++;
  }

  selectProvider(provider: Provider) {
    this.selectedProvider = provider;
  }

  order() {
    const bookigOrder: PostOrder = {
      services: this.selectedServices.map(s => ({ service: s })),
      ...this.additionalInfo!,
      providerId: this.selectedProvider!.id
    };
    return this.apiService.post("bookings", bookigOrder);
  }

  clear() {
    this.step = 1;
    this.selectedServices = [];
    this.selectedProvider = undefined;
    this.additionalInfo = undefined;
  }

  previousStep() {
    this.step--;
  }
}
