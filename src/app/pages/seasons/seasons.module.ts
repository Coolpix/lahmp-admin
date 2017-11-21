import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonsComponent } from './seasons.component';
import { SeasonsRoutingModule } from './seasons-route.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SeasonsRoutingModule,
    FormsModule
  ],
  declarations: [SeasonsComponent]
})

export class SeasonsModule { }
