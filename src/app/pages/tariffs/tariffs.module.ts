import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TariffsListComponent} from "./tariffs-list.component";

export const routes: Routes = [
  {
    path: '',
    component: TariffsListComponent
  }
];


@NgModule({
  declarations: [
    TariffsListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class TariffsModule { }
