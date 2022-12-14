import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsPanelComponent } from './subscriptions-panel/subscriptions-panel.component';
import {RouterModule, Routes} from "@angular/router";
import {ListboxModule} from "primeng/listbox";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import { SubscriptionModalComponent } from './subscription-modal/subscription-modal.component';
import {DialogModule} from "primeng/dialog";
import {SelectButtonModule} from "primeng/selectbutton";
import {
  SubscriptionSuccessDetailsComponent
} from "./subscription-success-details/subscription-success-details.component";
import {PaymentsModule} from "../payments/payments.module";


export const routes: Routes = [
  {
    path: 'subscribe',
    component: SubscriptionsPanelComponent
  },
  {
    path: 'payed',
    component: SubscriptionSuccessDetailsComponent
  }
];

@NgModule({
    declarations: [
        SubscriptionsPanelComponent,
        SubscriptionModalComponent,
        SubscriptionSuccessDetailsComponent
    ],
    exports: [
        SubscriptionModalComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ListboxModule,
        FormsModule,
        CalendarModule,
        DialogModule,
        SelectButtonModule,
        PaymentsModule
    ]
})
export class SubscriptionsModule { }
