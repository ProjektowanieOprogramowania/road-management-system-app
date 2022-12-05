import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuctionManagementComponent} from './auction-management/auction-management.component';
import {RouterModule, Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    component: AuctionManagementComponent
  }
];

@NgModule({
  declarations: [
    AuctionManagementComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AuctionsModule {
}
