import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { appInitializer } from './helpers/app.initializer';
import { AuthService } from './services/auth.service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { UserProfileSidebarComponent } from './components/user-profile-sidebar/user-profile-sidebar.component';
import { WorkerSidebarListComponent } from './components/worker-sidebar-list/worker-sidebar-list.component';
import { ClientSidebarListComponent } from './components/client-sidebar-list/client-sidebar-list.component';
import { ApiService } from './services/api.service';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { registerLocaleData } from '@angular/common';
import localeLt from '@angular/common/locales/lt';

registerLocaleData(localeLt, "lt");

@NgModule({
  declarations: [
    AppComponent,
    UserProfileSidebarComponent,
    WorkerSidebarListComponent,
    ClientSidebarListComponent,
    WelcomeComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, deps: [HttpClient] },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR"},
    { provide: LOCALE_ID, useValue: "lt" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
