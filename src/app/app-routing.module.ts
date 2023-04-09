import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserAlreadyLoggedInGuard } from './guards/user-already-logged-in.guard';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    canActivate: [UserAlreadyLoggedInGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    canActivate: [UserAlreadyLoggedInGuard],
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'register-provider',
    canActivate: [UserAlreadyLoggedInGuard],
    loadChildren: () => import('./pages/register-provider/register-provider.module').then( m => m.RegisterProviderPageModule)
  },
  {
    path: 'order-services',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/order-services/order-services.module').then( m => m.OrderServicesPageModule)
  },
  {
    path: 'orders',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'profile',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'report',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/provider-report/provider-report.module').then( m => m.ProviderReportPageModule)
  },
  {
    path: 'workers',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/workers/workers.module').then( m => m.WorkersPageModule)
  },  {
    path: 'worker-report',
    loadChildren: () => import('./pages/worker-report/worker-report.module').then( m => m.WorkerReportPageModule)
  },




  // {
  //   path: 'orders/:id',
  //   loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  // }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
