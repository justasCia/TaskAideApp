import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import Order from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, ViewWillEnter {
  order: Order;
  orderId: number;
  orderAddress: string;
  providerLooking: boolean = false;
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private locationService: LocationService,
    private router: Router,
    private alertController: AlertController,
    private ionLoaderService: IonLoaderService,
    private ionToastService: IonToastService) { }

  async ionViewWillEnter() {
    if (this.order) {
      this.ngOnInit();
    }
  }

  async ngOnInit() {
    await this.ionLoaderService.load(true);
    this.providerLooking = (this.authService.userValue != null && this.authService.userValue.role != null && this.authService.userValue.role == "Provider");
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
    });
    this.apiService.get(`bookings/${this.orderId}`).subscribe((response: any) => {
      this.order = response;
      this.getAddress();
      this.ionLoaderService.load(false);
    });
  }

  getAddress() {
    this.locationService.getAddress(this.order.address).then(address => this.orderAddress = address)
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }

  async acceptOffer() {
    if (!this.providerLooking) {
      await this.ionLoaderService.load(true);
      this.apiService.put(`bookings/${this.order.id}/status`, "Confirmed").subscribe(responseOrder => {
        this.order = responseOrder;
        this.ionLoaderService.load(false);
        this.ionToastService.showSuccess("Užsakymas sėkmingai priimtas");
      })
    }
  }

  async cancelOrder() {
    const alert = await this.alertController.create({
      header: 'Ar tikrai norite atšaukti šią darbo užklausą?',
      buttons: [
        {
          text: 'Atšaukti',
        },
        {
          text: 'Patvirtinti',
          handler: () => {
            this.cancel();
          },
        },
      ],
    });
    await alert.present();
  }

  private async cancel() {
    await this.ionLoaderService.load(true);
    this.apiService.put(`bookings/${this.order.id}/status`, "Cancelled").subscribe({
      next: response => {
        this.ionLoaderService.load(false);
        this.ionToastService.showSuccess("Užsakymas sėkmingai atšauktas");
        this.router.navigate(['/orders']);
      }
    });
  }

  async reject() {
    if (this.providerLooking) {
      const alert = await this.alertController.create({
        header: 'Ar tikrai norite atmesti šią darbo užklausą?',
        buttons: [
          {
            text: 'Atšaukti',
          },
          {
            text: 'Patvirtinti',
            handler: () => {
              this.rejectOrder();
            },
          },
        ],
      });
      await alert.present();
    }
  }

  private async rejectOrder() {
    await this.ionLoaderService.load(true);
    this.apiService.put(`bookings/${this.order.id}/status`, "Rejected").subscribe({
      next: response => {
        this.ionLoaderService.load(false);
        this.ionToastService.showSuccess("Užsakymas sėkmingai atmestas");
        this.router.navigate(['/orders'], { queryParams: { status: "pending" } });
      }
    });
  }
}
