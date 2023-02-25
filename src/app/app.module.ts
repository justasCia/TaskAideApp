import { APP_INITIALIZER, NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent, UserProfileSidebarComponent, WorkerSidebarListComponent, ClientSidebarListComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, deps: [HttpClient] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
