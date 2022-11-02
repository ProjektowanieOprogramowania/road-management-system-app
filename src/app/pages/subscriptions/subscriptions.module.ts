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


export const routes: Routes = [
  {
    path: 'subscribe',
    component: SubscriptionsPanelComponent
  },
  {
    path: 'subscribe-success/:id',
    component: SubscriptionSuccessDetailsComponent
  }
];

@NgModule({
  declarations: [
    SubscriptionsPanelComponent,
    SubscriptionModalComponent,
    SubscriptionSuccessDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ListboxModule,
    FormsModule,
    CalendarModule,
    DialogModule,
    SelectButtonModule
  ]
})
export class SubscriptionsModule { }
