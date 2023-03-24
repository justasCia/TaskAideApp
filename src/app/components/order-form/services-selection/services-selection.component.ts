import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Category from 'src/app/models/services/Category';
import Service from 'src/app/models/services/Service';
import ServiceWithQuantity from 'src/app/models/orders/ServiceWithQuantity';
import { OrderFormService } from 'src/app/services/order-form.service';
import { services } from '../categories';

@Component({
  selector: 'app-services-selection',
  templateUrl: './services-selection.component.html',
  styleUrls: ['./services-selection.component.scss'],
})
export class ServicesSelectionComponent implements OnInit {
  @Input() selectedCategory: Category;
  @Output() servicesSelected = new EventEmitter<Service[]>();

  nextDisabled: boolean = true

  selectedCategoryServices: Service[];
  selectedServices: Service[];

  constructor(private orderFormService: OrderFormService) { }

  ngOnInit() {
    this.selectedCategoryServices = services.filter(service => service.categoryId === this.selectedCategory.id);
    this.selectedServices = [];
    if (this.orderFormService.selectedServices) {
      this.orderFormService.selectedServices.forEach(selectedService => {
        this.selectedServices.push(selectedService);
      });
    }
    this.nextDisabled = this.selectedServices.length == 0;
  }

  onServiceSelect(serviceIndex: number) {
    const service = this.selectedCategoryServices[serviceIndex];
    if (this.selectedServices.includes(service)) {
      this.selectedServices = this.selectedServices.filter(item => item !== service);
    } else {
      this.selectedServices.push(service);
    }
    
    this.nextDisabled = this.selectedServices.length == 0;
  }

  selectServices() {
    this.servicesSelected.emit(this.selectedServices);
  }
}
