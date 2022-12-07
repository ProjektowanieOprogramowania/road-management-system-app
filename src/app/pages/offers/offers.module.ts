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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MakeOfferComponent } from './make-offer/make-offer.component';
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    OffersPageComponent,
    MakeOfferComponent
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
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule
  ]
})
export class OffersModule { }
