import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RecoverComponent} from "./recover.component";
import {RecoverRouteModule} from "./recover-route.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecoverRouteModule
  ],
  declarations: [RecoverComponent]
})
export class RecoverModule { }
