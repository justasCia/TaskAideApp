import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categories, services } from 'src/app/components/order-form/categories';
import Category from 'src/app/models/services/Category';
import Service from 'src/app/models/services/Service';
import { ApiService } from 'src/app/services/api.service';

interface Provider {
  description: string;
  workingRange: number;
  basePricePerHour: number;
  providerServices: { id: number }[];
}

@Component({
  selector: 'app-provider-info',
  templateUrl: './provider-info.page.html',
  styleUrls: ['./provider-info.page.scss'],
})
export class ProviderInfoPage implements OnInit {
  provider: Provider;
  categories: Category[] = categories;

  public expandedCategories: boolean[] = [];

  toggleCategory(index: number) {
    this.expandedCategories[index] = !this.expandedCategories[index];
  }

  constructor(private apiService: ApiService) { }

  getServices(category: Category) {
    return services.filter(s => s.categoryId === category.id);
  }

  ngOnInit() {
    this.apiService.get("/provider/information").subscribe({
      next: (response: any) => {
        this.provider = response;
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

}
