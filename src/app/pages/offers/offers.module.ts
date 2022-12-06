import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersPageComponent } from './offers-page/offers-page.component';
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    OffersPageComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ProgressSpinnerModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    DialogModule,
    RatingModule,
    FormsModule
  ]
})
export class OffersModule { }
