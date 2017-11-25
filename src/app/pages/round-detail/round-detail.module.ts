import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RoundDetailRouteModule} from './round-detail-route.module';
import {RoundDetailComponent} from './round-detail.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RoundDetailRouteModule,
    FormsModule
  ],
  declarations: [RoundDetailComponent]
})
export class RoundDetailModule { }
