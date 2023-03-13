import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/services/Category';
import ServiceWithQuantity from 'src/app/models/services/ServiceWithQuantity';
import { OrderFormService } from 'src/app/services/order-form.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  constructor(public orderFormService: OrderFormService) { }

  selectCategory(category: Category) {
    this.orderFormService.selectedCategory = category;
    this.orderFormService.step++;
  }

  selectServices(services: ServiceWithQuantity[]) {
    this.orderFormService.selectedServices = services;
    this.orderFormService.step++;
  }

  submitInfo(a: any) {
    console.log(a);
    this.orderFormService.step++;
  }

  previousStep() {
    this.orderFormService.step--;
  }

  

  ngOnInit() {}

}
