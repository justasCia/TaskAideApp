import { Injectable } from '@angular/core';
import Category from '../models/services/Category';
import ServiceWithQuantity from '../models/services/ServiceWithQuantity';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  step = 1;
  selectedCategory: Category;
  selectedServices: ServiceWithQuantity[];
  
  constructor() { }
  
  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.step++;
  }

  selectServices(services: ServiceWithQuantity[]) {
    this.selectedServices = services;
    this.step++;
  }

  submitInfo(a: any) {
    console.log(a);
    this.step++;
  }

  previousStep() {
    this.step--;
  }
}
