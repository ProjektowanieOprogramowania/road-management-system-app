import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'tariffs',
    loadChildren: () => import('./pages/tariffs/tariffs.module').then(m => m.TariffsModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./pages/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
  },
  {
    path: 'penalties',
    loadChildren: () => import('./pages/penalties/penalties.module').then(m => m.PenaltiesModule)
  },
  {
    path: 'charges',
    loadChildren: () => import('./pages/charges/charges.module').then(m => m.ChargesModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'sensor',
    loadChildren: () => import('./pages/sensors/sensors.module').then(m => m.SensorsModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
