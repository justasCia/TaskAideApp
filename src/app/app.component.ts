import { Component } from '@angular/core';
import { User } from './models/auth/User';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: User | null = null;
  public appPages = [
    { title: 'Darbastalis', url: '/folder/Darbastalis', icon: 'apps' },
    { title: 'Paslaugos', url: '/folder/Paslaugos', icon: 'list' },
    { title: 'Darbai', url: '/folder/Darbai', icon: 'calendar' },
    { title: 'Sąskaitos', url: '/folder/Sąskaitos', icon: 'barcode' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }
}
