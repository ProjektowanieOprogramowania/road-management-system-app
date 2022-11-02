import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'tolls',
    loadChildren: () => import('./pages/tolls/tolls.module').then(m => m.TollsModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
