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
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import { RoadMapDeleteModalComponent } from './road-map-delete-modal/road-map-delete-modal.component';
import {DialogModule} from "primeng/dialog";
import {SubscriptionsModule} from "../subscriptions/subscriptions.module";
import {DividerModule} from "primeng/divider";
import {RippleModule} from "primeng/ripple";
import {DockModule} from "primeng/dock";
import {CheckboxModule} from "primeng/checkbox";
import {ToggleButtonModule} from "primeng/togglebutton";

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
    RoadMapEditorComponent,
    RoadMapDeleteModalComponent
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
    ProgressSpinnerModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DialogModule,
    SubscriptionsModule,
    DividerModule,
    RippleModule,
    DockModule,
    CheckboxModule,
    ToggleButtonModule
  ]
})
export class MapModule {
}
