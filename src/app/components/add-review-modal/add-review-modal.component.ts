import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Order from 'src/app/models/Order';
import Review from 'src/app/models/reviews/Review';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-add-review-modal',
  templateUrl: './add-review-modal.component.html',
  styleUrls: ['./add-review-modal.component.scss'],
})
export class AddReviewModalComponent implements OnInit {
  @Input() orderId: number;
  review: Review = {
    rating: 3,
  }
  constructor(private modalController: ModalController, private apiService: ApiService, private ionLoaderService: IonLoaderService) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async addReview() {
    await this.ionLoaderService.load(true);
    this.apiService.post(`bookings/${this.orderId}/review`, this.review).subscribe({
      next: (responseOrder: Order) => {
        this.successResponse(responseOrder);
      },
      error: err => {
        this.errorResponse();
      }
    });
  }

  private successResponse(order: Order) {
    this.ionLoaderService.load(false);
    this.modalController.dismiss(order);
  }

  private errorResponse() {
    //this.error = "Nepavyko pridėti banko sąskaitos";
    this.ionLoaderService.load(false);
  }
}
