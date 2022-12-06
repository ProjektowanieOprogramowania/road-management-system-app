import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuctionManagementComponent} from './auction-management/auction-management.component';
import {RouterModule, Routes} from "@angular/router";
import {AuctionModifyComponent} from './auction-modify/auction-modify.component';
import {ToastModule} from "primeng/toast";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";

export const routes: Routes = [
  {
    path: '',
    component: AuctionManagementComponent
  },
  {
    path: 'modify',
    component: AuctionModifyComponent
  }
];

@NgModule({
  declarations: [
    AuctionManagementComponent,
    AuctionModifyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule,
  ]
})
export class AuctionsModule {
}
