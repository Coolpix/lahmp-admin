import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {TeamsRoutingModule} from './team-detail-route.module';
import {TeamDetailComponent} from './team-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TeamsRoutingModule,
    FormsModule
  ],
  declarations: [
    TeamDetailComponent
  ]
})
export class TeamDetailModule { }
