import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NotPaidPassingChargesComponent
} from './passing-charges/not-paid-passing-charges/not-paid-passing-charges.component';
import {ChargesHistoryComponent} from './charges-history/charges-history.component';
import {RouterModule, Routes} from "@angular/router";
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {
  PayPassingChargeModalComponent
} from './passing-charges/pay-passing-charge-modal/pay-passing-charge-modal.component';
import {ChargeDetailsModalComponent} from './charge-details-modal/charge-details-modal.component';

export const routes: Routes = [
  {
    path: 'passingCharges',
    component: NotPaidPassingChargesComponent
  },
  {
    path: '',
    component: ChargesHistoryComponent
  }
];

@NgModule({
  declarations: [
    NotPaidPassingChargesComponent,
    ChargesHistoryComponent,
    PayPassingChargeModalComponent,
    ChargeDetailsModalComponent
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
export class ChargesModule {
}
