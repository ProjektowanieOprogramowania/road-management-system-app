import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TariffsListComponent} from "./TariffList/tariffs-list.component";
import { TariffCreateFormComponent } from './tariff-create-form/tariff-create-form.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import { EditTariffComponent } from './edit-tariff/edit-tariff.component';
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";

export const routes: Routes = [
  {
    path: '',
    component: TariffsListComponent
  },
  {
    path: 'edit/:id',
    component: EditTariffComponent
  },
  {
    path: 'create',
    component: TariffCreateFormComponent
  }
];


@NgModule({
  declarations: [
    TariffsListComponent,
    EditTariffComponent,
    TariffCreateFormComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        TableModule,
        ProgressSpinnerModule,
        ButtonModule,
        DialogModule,
        InputNumberModule,
        InputTextModule,
        FormsModule,
        CheckboxModule,
        ToastModule,
        TooltipModule
    ]
})
export class TariffsModule { }
