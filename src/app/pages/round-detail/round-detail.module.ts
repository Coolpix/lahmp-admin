import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {RoundDetailRouteModule} from "./round-detail-route.module";
import {RoundDetailComponent} from "./round-detail.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RoundDetailRouteModule
  ],
  declarations: [RoundDetailComponent]
})
export class RoundDetailModule { }
