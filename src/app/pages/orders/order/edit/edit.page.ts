import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Order from 'src/app/models/Order';
import User from 'src/app/models/User';
import Provider from 'src/app/models/Provider';
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
  companyLooking: boolean = false;
  dropdownOptions: User[] = []
  cancelWithPartialPayment: boolean = false;

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
    this.cancelWithPartialPayment = this.route.snapshot.queryParams['cancelWithPartialPayment'];
    this.ionLoaderService.load(true).then(() => {
      this.providerLooking = (this.authService.userValue != null &&
        this.authService.userValue.role != null &&
        (this.authService.userValue.role.includes("Provider") || this.authService.userValue.role.includes("Company") || this.authService.userValue.role.includes("CompanyWorker")));
      this.companyLooking = (this.authService.userValue != null &&
        this.authService.userValue.role != null &&
        this.authService.userValue.role.includes("Company"));
      this.route.params.subscribe(params => {
        this.orderId = params['id'];
      });
      
      this.apiService.get(`bookings/${this.orderId}`).subscribe((response: any) => {
        this.order = response
        this.getAddress();
        this.ionLoaderService.load(false);
      });
      if (this.companyLooking) {
        this.apiService.get('company/users').subscribe((workers: any) => {
          this.dropdownOptions = workers;
        })
      }
    });
  }

  compareWith(o1: Provider, o2: Provider) {
    return o1 && o1.id == o2.id;
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
            this.ionToastService.showSuccess("Pasiūlymas klientui išsiųstas");
            this.router.navigate([`/orders/${this.orderId}`]);
          })
        })
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }

  async sendBill() {
    if (this.providerLooking && this.order.status == "Confirmed") {
      if (!this.validPrices()) {
        return;
      }
      await this.ionLoaderService.load(true);
      this.apiService.put(`Bookings/${this.orderId}/services`, this.order.services).subscribe(responseOrder => {
        this.apiService.put(`Bookings/${this.orderId}/materialPrices`, this.order.materialPrices).subscribe(responseOrder => {
          const status = this.cancelWithPartialPayment ? 'CancelledWithPartialPayment' : 'Completed'
          this.apiService.put(`Bookings/${this.orderId}/status`, status).subscribe(responseOrder => {
            this.ionLoaderService.load(false);
            const toastMessageStatus = this.cancelWithPartialPayment ? 'atšauktas su daliniu mokėjimu' : 'atliktas'
            this.ionToastService.showSuccess(`Darbas sėkmingai pažymėtas kaip ${toastMessageStatus}.`);
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

  assignWorker(event: Event) {
    const target = event.target as HTMLInputElement;
    const worker = target.value as any;
    console.log(target.value);
    this.apiService.post(`bookings/${this.orderId}/worker?workerId=${worker.id}`, {}).subscribe();
  }
}
