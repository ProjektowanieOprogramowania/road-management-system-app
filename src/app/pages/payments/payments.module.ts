import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WaitingForPaymentComponent} from './waiting-for-payment/waiting-for-payment.component';
import {RouterModule, Routes} from "@angular/router";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ToastModule} from "primeng/toast";

export const routes: Routes = [
  {
    path: 'waiting',
    component: WaitingForPaymentComponent
  }
];

@NgModule({
    declarations: [
        WaitingForPaymentComponent
    ],
    exports: [
        WaitingForPaymentComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ProgressSpinnerModule,
        ToastModule
    ]
})
export class PaymentsModule { }
