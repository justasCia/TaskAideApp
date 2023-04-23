import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { translateBookingStatusToLithuanian } from 'src/app/helpers/orderStatusTranslator';
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
  providerActivated: boolean = true;

  constructor(private authService: AuthService, private apiService: ApiService, private ionLoaderService: IonLoaderService, private route: ActivatedRoute) { }

  getOrders(url: string) {
    this.apiService.get(url).subscribe({
      next: (response: any) => {
        this.orders = response;
        this.providerActivated = true;
        this.ionLoaderService.load(false);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error && error.error === "User cannot accept bookings until provider information filled") {
          this.providerActivated = false;
        }
        this.ionLoaderService.load(false);
      }
    })
  }

  getServices(booking: Order) {
    let services = "";
    booking.services.forEach(service => {
      services += service.service.name + ", "
    });
    return services.slice(0, -2);
  }

  getBookingStatusInLithuanian(order: Order): string {
    return translateBookingStatusToLithuanian(order.status);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let url = "bookings";
      const status = params["status"];
      const paid = params["paid"];
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
          case "done":
            url += "?status=done";
            break;
          default:
            break;
        }
        if (paid) {
          url += `&paid=${paid as boolean}`
        }
      }
      this.ionLoaderService.load(true).then(() => {
        this.getOrders(url);
      });
    });
  }
}
