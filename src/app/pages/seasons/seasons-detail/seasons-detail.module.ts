import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SeasonsDetailRoutingModule} from './seasons-detail-route.module';
import {SharedModule} from '../../../shared/shared.module';
import {SeasonsDetailComponent} from './seasons-detail.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SeasonsDetailRoutingModule,
    FormsModule
  ],
  declarations: [
    SeasonsDetailComponent
  ]
})
export class SeasonsDetailModule { }
