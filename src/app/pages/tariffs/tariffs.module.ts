import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TariffsListComponent} from "./tariffs-list.component";
import { TariffCreateFormComponent } from './tariff-create-form/tariff-create-form.component';

export const routes: Routes = [
  {
    path: '',
    component: TariffsListComponent
  },
  {
    path: 'create',
    component: TariffCreateFormComponent
  }
];


@NgModule({
  declarations: [
    TariffsListComponent,
    TariffCreateFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class TariffsModule { }
