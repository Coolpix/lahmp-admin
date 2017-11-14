import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PlayerDetailRouteModule} from './player-detail-route.module';
import {PlayerDetailComponent} from './player-detail.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PlayerDetailRouteModule
  ],
  declarations: [PlayerDetailComponent]
})
export class PlayerDetailModule { }
