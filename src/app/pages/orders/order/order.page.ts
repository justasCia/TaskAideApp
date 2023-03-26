import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Order from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  order: Order;
  orderId: number;
  orderAddress: string;
  providerLooking: boolean;
  constructor(private authService: AuthService, private route: ActivatedRoute, private apiService: ApiService, private locationService: LocationService, private router: Router) { }

  ionViewWillEnter() {
    this.ngOnInit();
  }

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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }

  goToEdit() {
    this.router.navigate([`/orders/${this.orderId}/edit`]);
  }
}
