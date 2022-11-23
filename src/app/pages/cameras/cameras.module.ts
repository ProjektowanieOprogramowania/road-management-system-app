import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCameraComponent } from './view-camera/view-camera.component';
import {RouterModule, Routes} from "@angular/router";
import {GMapModule} from "primeng/gmap";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

export const routes: Routes = [
  {
    path: 'view-camera',
    component: ViewCameraComponent
  }
];

@NgModule({
  declarations: [
    ViewCameraComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GMapModule,
    DropdownModule,
    FormsModule
  ]
})
export class CamerasModule { }
