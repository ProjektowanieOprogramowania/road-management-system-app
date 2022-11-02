import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenaltiesHistoryComponent } from './penalties-history/penalties-history.component';
import {RouterModule, Routes} from "@angular/router";
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: PenaltiesHistoryComponent
  }
]

@NgModule({
  declarations: [
    PenaltiesHistoryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    CheckboxModule,
    FormsModule
  ]
})
export class PenaltiesModule { }
