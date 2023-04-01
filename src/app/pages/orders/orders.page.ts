import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth/User';
import Order from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[];

  constructor(private authService: AuthService, private apiService: ApiService, private ionLoaderService: IonLoaderService, private route: ActivatedRoute) { }

  getOrders(url: string) {
    this.apiService.get(url).subscribe((response: any) => {
      this.orders = response;
      this.ionLoaderService.load(false);
    });
  }

  getServices(booking: Order) {
    let services = "";
    booking.services.forEach(service => {
      services += service.service.name + ", "
    });
    return services.slice(0, -2);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let url = "bookings";
      const status = params["status"];
      if (status) {
        switch (status) {
          case "pending":
            url += "?status=Pending";
            break;
          case "inNegotiation":
            url += "?status=InNegotiation";
            break;
          case "confirmed":
            url += "?status=Confirmed";
            break;
          default:
            break;
        }
      }
      this.ionLoaderService.load(true).then(() => {
        this.getOrders(url);
      })
    });
  }
}
