import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth/User';
import Order from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[];
  user$: Observable<User | null> = new Observable<User | null>();

  constructor(private authService: AuthService, private apiService: ApiService, private modalController: ModalController) { }

  getOrders() {
    this.apiService.get("bookings").subscribe((response: any) => {
      this.orders = response;
    })
  }

  getServices(booking: Order) {
    let services = "";
    booking.services.forEach(service => {
      services += service.service.name + ", "
    });
    return services.slice(0,-2);
  }

  ngOnInit() {
    console.log("beleka");
    this.user$ = this.authService.user;
    this.getOrders();
  }
}
