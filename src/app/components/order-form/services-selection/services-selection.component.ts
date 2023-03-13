import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Category from 'src/app/models/services/Category';
import ServiceWithQuantity from 'src/app/models/services/ServiceWithQuantity';
import { OrderFormService } from 'src/app/services/order-form.service';

@Component({
  selector: 'app-services-selection',
  templateUrl: './services-selection.component.html',
  styleUrls: ['./services-selection.component.scss'],
})
export class ServicesSelectionComponent implements OnInit {
  @Input() selectedCategory: Category;
  @Output() servicesSelected = new EventEmitter<ServiceWithQuantity[]>();

  nextDisabled: boolean = true

  servicesWithQuantity: ServiceWithQuantity[];

  constructor(private orderFormService: OrderFormService) { }

  ngOnInit() {
    if (this.orderFormService.selectedServices) {
      this.servicesWithQuantity = this.selectedCategory.services.map(service => ({ service, quantity: 0 }));
      this.servicesWithQuantity.forEach(service => {
        this.orderFormService.selectedServices.forEach(selectedService => {
          if (service.service.id == selectedService.service.id) {
            service.quantity = selectedService.quantity;
          }
        });
      });
    } else {
      this.servicesWithQuantity = this.selectedCategory.services.map(service => ({ service, quantity: 0 }));
    }
  }

  incrementQuantity(index: number) {
    this.servicesWithQuantity[index].quantity++;
    this.nextDisabled = false;
  }

  decrementQuantity(index: number) {
    if (this.servicesWithQuantity[index].quantity > 0) {
      this.servicesWithQuantity[index].quantity--;
      this.nextDisabled = this.servicesWithQuantity.filter(service => service.quantity > 0).length == 0;
    }
  }

  selectServices() {
    this.servicesSelected.emit(this.servicesWithQuantity.filter(service => service.quantity > 0));
  }
}
