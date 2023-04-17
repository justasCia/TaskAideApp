import { Component, OnInit } from '@angular/core';
import { User } from './models/auth/User';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { IonToastService } from './services/ion-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User | null;
  public appPages = [
    { title: 'Darbastalis', url: '/folder/Darbastalis', icon: 'apps' },
    { title: 'Paslaugos', url: '/folder/Paslaugos', icon: 'list' },
    { title: 'Darbai', url: '/folder/Darbai', icon: 'calendar' },
    { title: 'Sąskaitos', url: '/folder/Sąskaitos', icon: 'barcode' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private authService: AuthService, private apiService: ApiService, private ionToastService: IonToastService) { }

  ngOnInit(): void {
    this.user = this.authService.userValue;
    const isProvider = this.user && this.user?.role?.includes("Provider");
    const isCompany = this.user && this.user?.role?.includes("Company");
    if (isProvider || isCompany) {
      this.apiService.get("provider/information").subscribe({
        next: (provider: any) => {
          if (!provider.bankAccount) {
            this.ionToastService.showWarning("Nesate pridėję banko sąskaitos, norint dirbti, tai galite padaryti nuėjė į savo profilį", true);
          }
        },
        error: error => {
          if (error.status === 404) {
            const word = isProvider ? "darbuotojo" : "kompanijos";
            this.ionToastService.showWarning(`Nesate pridėję reikiamos ${word} informacijos, norint dirbti, tai galite padaryti nuėjė į savo profilį`, true);
          }
        }
      })
    }
  }
}
