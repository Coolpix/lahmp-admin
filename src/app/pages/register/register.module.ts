import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "./register.component";
import {FormsModule} from "@angular/forms";
import {RegisterRouteModule} from "./register-route.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegisterRouteModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
