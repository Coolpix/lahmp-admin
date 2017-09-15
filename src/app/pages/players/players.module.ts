import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';
import { PlayerRoutingModule } from "./players-route.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	imports: [
    	CommonModule,
      SharedModule,
    	PlayerRoutingModule
    ],
	declarations: [
	  PlayersComponent
  ]
})

export class PlayersModule { }
