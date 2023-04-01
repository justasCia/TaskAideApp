import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Location from 'src/app/models/Location';
import Category from 'src/app/models/services/Category';
import { ApiService } from 'src/app/services/api.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { categories, services } from '../order-form/categories';

interface Provider {
  description: string;
  location?: Location;
  workingRange: number;
  basePricePerHour: number;
  providerServices: { id: number }[];
}

@Component({
  selector: 'app-provider-info',
  templateUrl: './provider-info.component.html',
  styleUrls: ['./provider-info.component.scss'],
})
export class ProviderInfoComponent implements OnInit {
  provider: Provider;
  categories: Category[] = categories;


  public expandedCategories: boolean[] = [];
  public selectedServices: boolean[] = [];

  toggleCategory(index: number) {
    this.expandedCategories[index] = !this.expandedCategories[index];
  }

  constructor(private apiService: ApiService, private ionLoaderService: IonLoaderService, private ionToastService: IonToastService) { }

  getServices(category: Category) {
    return services.filter(s => s.categoryId === category.id);
  }

  ngOnInit() {
    this.ionLoaderService.load(true).then(() => {
      this.apiService.get("provider/information").subscribe({
        next: (response: any) => {
          this.provider = response;
          this.provider.providerServices.forEach(service => {
            this.selectedServices[service.id] = true;
            const selectedService = services.filter(s => s.id == service.id)[0];
            this.expandedCategories[selectedService.categoryId] = true;
          });
          this.ionLoaderService.load(false);
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
          this.ionLoaderService.load(false);
        }
      });
    })
  }

  log() {
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
      this.ionToastService.showSuccess("Pavyko atnaujinti informaciją");
      this.ionLoaderService.load(false);
    })
  }

  setAddress(location: Location) {
    this.provider.location = location;
  }
}
