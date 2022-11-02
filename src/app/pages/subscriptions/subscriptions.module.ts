import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsPanelComponent } from './subscriptions-panel/subscriptions-panel.component';
import {RouterModule, Routes} from "@angular/router";
import {ListboxModule} from "primeng/listbox";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";


export const routes: Routes = [
  {
    path: 'subscribe',
    component: SubscriptionsPanelComponent
  }
];

@NgModule({
  declarations: [
    SubscriptionsPanelComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ListboxModule,
    FormsModule,
    CalendarModule
  ]
})
export class SubscriptionsModule { }
