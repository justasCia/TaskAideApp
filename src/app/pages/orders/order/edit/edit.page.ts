import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Order from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
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
  providerLooking: boolean = false;

  materialPricesValidationSucessfull: boolean = true;
  servicesValidationSucessfull: boolean = true;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private locationService: LocationService,
    private ionLoaderService: IonLoaderService,
    private ionToastService: IonToastService,
    private router: Router) { }

  ngOnInit() {
    this.ionLoaderService.load(true).then(() => {
      this.providerLooking = (this.authService.userValue != null && 
        this.authService.userValue.role != null && 
        (this.authService.userValue.role.includes("Provider") || this.authService.userValue.role.includes("Company") || this.authService.userValue.role.includes("CompanyWorker")));
      this.route.params.subscribe(params => {
        this.orderId = params['id'];
      });
      this.apiService.get(`bookings/${this.orderId}`).subscribe((response: any) => {
        this.order = response
        this.getAddress();
        this.ionLoaderService.load(false);
      });
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

  async sendOrUpdateOffer() {
    if (this.providerLooking && this.order.status == "Pending" || this.order.status == "InNegotiation") {
      if (!this.validPrices()) {
        return;
      }
      await this.ionLoaderService.load(true);
      this.apiService.put(`Bookings/${this.orderId}/services`, this.order.services).subscribe(responseOrder => {
        this.apiService.put(`Bookings/${this.orderId}/materialPrices`, this.order.materialPrices).subscribe(responseOrder => {
          this.apiService.put(`Bookings/${this.orderId}/status`, "InNegotiation").subscribe(responseOrder => {
            this.ionLoaderService.load(false);
            this.ionToastService.showSuccess("Pasiųlymas klientui išsiųstas");
            this.router.navigate([`/orders/${this.orderId}`]);
          })
        })
      });
    }
  }

  async sendBill() {
    if (this.providerLooking && this.order.status == "Confirmed") {
      if (!this.validPrices()) {
        return;
      }
      await this.ionLoaderService.load(true);
      this.apiService.put(`Bookings/${this.orderId}/services`, this.order.services).subscribe(responseOrder => {
        this.apiService.put(`Bookings/${this.orderId}/materialPrices`, this.order.materialPrices).subscribe(responseOrder => {
          this.apiService.put(`Bookings/${this.orderId}/status`, "Completed").subscribe(responseOrder => {
            this.ionLoaderService.load(false);
            this.ionToastService.showSuccess("Darbas pažymėtas kaip atliktas, sąskaita klientui išsiųsta");
            this.router.navigate([`/orders/${this.orderId}`]);
          })
        })
      });
    }
  }

  private validPrices() {
    this.materialPricesValidationSucessfull = true;
    for (let i = 0; i < this.order.materialPrices.length; i++) {
      const materialPrice = this.order.materialPrices[i];
      if (materialPrice.name.trim() == "" || materialPrice.price == null) {
        this.materialPricesValidationSucessfull = false;
        return false;
      }
    }
    this.servicesValidationSucessfull = true;
    for (let i = 0; i < this.order.services.length; i++) {
      const service = this.order.services[i];
      if (service.hoursOfWork == null || service.price == null) {
        this.servicesValidationSucessfull = false;
        return false
      }
    }
    return true;
  }
}
