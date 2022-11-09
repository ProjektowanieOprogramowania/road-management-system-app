import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MenubarModule} from "primeng/menubar";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import { ProfileChangeComponent } from './components/profile-change/profile-change.component';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NavbarComponent,
    ProfileChangeComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ]
})
export class SharedModule { }
