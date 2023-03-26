import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Order from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  order: Order;
  orderId: number;
  orderAddress: string;
  providerLooking: boolean;

  materialPricesValidationSucessfull: boolean = true;
  servicesValidationSucessfull: boolean = true;

  constructor(private authService: AuthService, private route: ActivatedRoute, private apiService: ApiService, private locationService: LocationService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.providerLooking = user!.role == "Provider";
    })
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
    });
    this.apiService.get(`bookings/${this.orderId}`).subscribe((response: any) => {
      this.order = response
      this.getAddress();
    });
  }

  getAddress() {
    this.locationService.getAddress(this.order.address).then(address => this.orderAddress = address)
  }

  addMaterialPrice() {
    this.order.materialPrices.push({ name: '', price: 0 });
  }

  removeMaterialPrice(index: number) {
    this.order.materialPrices.splice(index, 1);
  }

  updateMaterialPrices() {
    this.materialPricesValidationSucessfull = true;
    for (let i = 0; i < this.order.materialPrices.length; i++) {
      const materialPrice = this.order.materialPrices[i];
      if (materialPrice.name.trim() == "" || materialPrice.price == null) {
        this.materialPricesValidationSucessfull = false;
        return;
      }
    }
    this.apiService.put(`Bookings/${this.orderId}/materialPrices`, this.order.materialPrices).subscribe(responseOrder => {
      this.order = responseOrder;
    })
  }

  updateServices() {
    this.servicesValidationSucessfull = true;
    for (let i = 0; i < this.order.services.length; i++) {
      const service = this.order.services[i];
      if (service.hoursOfWork == null || service.price == null) {
        this.servicesValidationSucessfull = false;
        return;
      }
    }
    this.apiService.put(`Bookings/${this.orderId}/services`, this.order.services).subscribe(responseOrder => {
      this.order = responseOrder;
    })
  }
}