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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
