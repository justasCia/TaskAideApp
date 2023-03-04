import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Category from 'src/app/models/services/Category';
import Service from 'src/app/models/services/Service';
import { categories } from '../categories';

interface ServiceWithQuantity {
  service: Service,
  quantity: number,
}

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  categoryId: number;
  category: Category;

  servicesWithQuantity: ServiceWithQuantity[];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.category = categories.filter(c => c.id == this.categoryId)[0];
    this.servicesWithQuantity = this.category.services.map(service => ({ service, quantity: 0 }));
  }

  incrementQuantity(index: number) {
    this.servicesWithQuantity[index].quantity++;
  }

  decrementQuantity(index: number) {
    if (this.servicesWithQuantity[index].quantity > 0) {
      this.servicesWithQuantity[index].quantity--;
    }
  }

  continueWithOrder() {
    debugger;
    const selectedServices = this.servicesWithQuantity.filter(sq => sq.quantity > 0);
    console.log(selectedServices);
  }

}
