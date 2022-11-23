import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import { SensorRegisterFormComponent } from './sensor-register-form/sensor-register-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from "primeng/button";
import {GMapModule} from "primeng/gmap";

export const routes: Routes = [
  {
    path: 'register',
    component: SensorRegisterFormComponent
  }
];

@NgModule({
  declarations: [
    SensorRegisterFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    GMapModule,
  ]
})
export class SensorsModule { }