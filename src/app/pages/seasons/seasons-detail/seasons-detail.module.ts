import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SeasonsDetailRoutingModule} from "./seasons-detail-route.module";
import {SharedModule} from "../../../shared/shared.module";
import {SeasonsDetailComponent} from "./seasons-detail.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SeasonsDetailRoutingModule
  ],
  declarations: [
    SeasonsDetailComponent
  ]
})
export class SeasonsDetailModule { }
