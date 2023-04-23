import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Location from 'src/app/models/Location';
import Category from 'src/app/models/services/Category';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { categories, services } from '../order-form/categories';
import { ModalController } from '@ionic/angular';
import { BankAccountModalComponent } from '../bank-account-modal/bank-account-modal.component';

interface Provider {
  description: string;
  location?: Location;
  workingRange: number;
  basePricePerHour: number;
  providerServices: { id: number }[];
  bankAccount?: string;
  employmentNumberOrCompanyCode?: string;
}

@Component({
  selector: 'app-provider-info',
  templateUrl: './provider-info.component.html',
  styleUrls: ['./provider-info.component.scss'],
})
export class ProviderInfoComponent implements OnInit {
  provider: Provider;
  existingProvider: boolean = false;
  existingBankAccount: boolean = false;
  categories: Category[] = categories;


  public expandedCategories: boolean[] = [];
  public selectedServices: boolean[] = [];

  toggleCategory(index: number) {
    this.expandedCategories[index] = !this.expandedCategories[index];
  }

  constructor(private apiService: ApiService, private ionLoaderService: IonLoaderService, private ionToastService: IonToastService, private modalController: ModalController) { }

  getServices(category: Category) {
    return services.filter(s => s.categoryId === category.id);
  }

  ngOnInit() {
    this.apiService.get("provider/information").subscribe({
      next: (response: any) => {
        this.provider = response;
        this.existingProvider = true;
        this.existingBankAccount = this.provider.bankAccount != null;
        this.provider.providerServices.forEach(service => {
          this.selectedServices[service.id] = true;
          const selectedService = services.filter(s => s.id == service.id)[0];
          this.expandedCategories[selectedService.categoryId] = true;
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.provider = {
            description: "",
            workingRange: 0,
            basePricePerHour: 0,
            providerServices: []
          };
        }
      }
    });
  }

  updateInformation() {
    this.ionLoaderService.load(true);
    this.provider.providerServices = (this.selectedServices.map((s, index) => {
      if (s) {
        return ({ id: index })
      } else {
        return ({ id: -1 })
      }
    }).filter(s => s.id !== -1));
    this.apiService.put("provider/information", this.provider).subscribe(responseProvider => {
      this.provider = responseProvider;
      this.existingProvider = true;
      this.existingBankAccount = this.provider.bankAccount != null;
      this.ionToastService.showSuccess("Pavyko atnaujinti informaciją");
      this.ionLoaderService.load(false);
    })
  }

  setAddress(location: Location) {
    this.provider.location = location;
  }

  async openBankAccountModal() {
    const modal = await this.modalController.create({
      component: BankAccountModalComponent,
      componentProps: {
        update: this.existingBankAccount,
      }
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.provider = result.data;
      }
      this.existingBankAccount = this.provider.bankAccount != null;
    });

    return await modal.present();
  }

  toggleCategoryServices(category: Category, event: Event) {
    const servicesToBeToggled = services.filter(s => s.categoryId === category.id);
    servicesToBeToggled.forEach(service => {
      this.selectedServices[service.id] = (event as CustomEvent).detail.checked;
    });
  }
}
