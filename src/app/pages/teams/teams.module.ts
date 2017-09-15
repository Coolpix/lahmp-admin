import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from "./teams.component";
import { TeamsRoutingModule } from "./teams-route.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TeamsRoutingModule
  ],
  declarations: [TeamsComponent]
})

export class TeamsModule { }
