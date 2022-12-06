import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuctionManagementComponent} from './auction-management/auction-management.component';
import {RouterModule, Routes} from "@angular/router";
import {AuctionModifyComponent} from './auction-modify/auction-modify.component';
import {ToastModule} from "primeng/toast";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";
import {CheckboxModule} from "primeng/checkbox";
import {SpinnerModule} from "primeng/spinner";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {OffersPageComponent} from "../offers/offers-page/offers-page.component";
import {OffersModule} from "../offers/offers.module";

export const routes: Routes = [
  {
    path: '',
    component: AuctionManagementComponent
  },
  {
    path: 'modify',
    component: AuctionModifyComponent
  },
  {
    path: ':id/offers',
    component: OffersPageComponent
  }
];

@NgModule({
  declarations: [
    AuctionManagementComponent,
    AuctionModifyComponent
  ],
  imports: [
    OffersModule,
    RouterModule.forChild(routes),
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    SpinnerModule,
    ProgressSpinnerModule,
    DialogModule,
  ]
})
export class AuctionsModule {
}
