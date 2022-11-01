import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TariffsListComponent} from "./tariffs-list.component";
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ButtonModule} from "primeng/button";

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
        CommonModule,
        TableModule,
        ProgressSpinnerModule,
        ButtonModule
    ]
})
export class TariffsModule { }
