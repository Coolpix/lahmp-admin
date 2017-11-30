import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {MatchDetailRouteModule} from './match-detail-route.module';
import {MatchDetailComponent} from './match-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatchDetailRouteModule
  ],
  declarations: [MatchDetailComponent]
})
export class MatchDetailModule { }
