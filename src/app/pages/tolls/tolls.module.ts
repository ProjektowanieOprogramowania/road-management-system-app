import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotPaidTollsComponent } from './not-paid-tolls/not-paid-tolls.component';
import { TollsHistoryComponent } from './tolls-history/tolls-history.component';
import {RouterModule, Routes} from "@angular/router";
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { PayTollModalComponent } from './pay-toll-modal/pay-toll-modal.component';
import { TollDetailsModalComponent } from './toll-details-modal/toll-details-modal.component';

export const routes: Routes = [
  {
    path: '',
    component: NotPaidTollsComponent
  },
  {
    path: 'history',
    component: TollsHistoryComponent
  }
];

@NgModule({
  declarations: [
    NotPaidTollsComponent,
    TollsHistoryComponent,
    PayTollModalComponent,
    TollDetailsModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    DialogModule,
    SelectButtonModule,
    FormsModule,
    ButtonModule
  ]
})
export class TollsModule { }
