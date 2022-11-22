import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoadMapComponent} from './road-map/road-map.component';
import {RouterModule, Routes} from "@angular/router";
import { RoadMapEditorComponent } from './road-map-editor/road-map-editor.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";

export const routes: Routes = [
  {
    path: 'roadMap',
    component: RoadMapComponent
  },
  {
    path: 'roadMapEditor',
    component: RoadMapEditorComponent
  },
];

@NgModule({
  declarations: [
    RoadMapComponent,
    RoadMapEditorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule
  ]
})
export class MapModule {
}
