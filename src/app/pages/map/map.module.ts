import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoadMapComponent} from './road-map/road-map.component';
import {RouterModule, Routes} from "@angular/router";
import { RoadMapEditorComponent } from './road-map-editor/road-map-editor.component';

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
    CommonModule
  ]
})
export class MapModule {
}
