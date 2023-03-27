import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'order-services',
    loadChildren: () => import('./pages/order-services/order-services.module').then( m => m.OrderServicesPageModule)
  },
  {
    path: 'register-provider',
    loadChildren: () => import('./pages/register-provider/register-provider.module').then( m => m.RegisterProviderPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'provider-info',
    loadChildren: () => import('./pages/provider-info/provider-info.module').then( m => m.ProviderInfoPageModule)
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
