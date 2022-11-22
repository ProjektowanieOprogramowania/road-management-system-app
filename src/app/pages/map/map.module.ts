import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoadMapComponent} from './road-map/road-map.component';
import {RouterModule, Routes} from "@angular/router";
import { RoadMapEditorComponent } from './road-map-editor/road-map-editor.component';
import {ListboxModule} from "primeng/listbox";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {GMapModule} from "primeng/gmap";
import {ButtonModule} from "primeng/button";
import {SpinnerModule} from "primeng/spinner";
import {ProgressSpinnerModule} from "primeng/progressspinner";

export const routes: Routes = [
  {
    path: 'roadMap',
    component: RoadMapComponent
  }
];

@NgModule({
  declarations: [
    RoadMapComponent,
    RoadMapEditorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ListboxModule,
    FormsModule,
    ToastModule,
    GMapModule,
    ButtonModule,
    SpinnerModule,
    ProgressSpinnerModule
  ]
})
export class MapModule {
}
