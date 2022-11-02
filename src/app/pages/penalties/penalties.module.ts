import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenaltiesHistoryComponent } from './penalties-history/penalties-history.component';
import {RouterModule, Routes} from "@angular/router";


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
    CommonModule
  ]
})
export class PenaltiesModule { }
