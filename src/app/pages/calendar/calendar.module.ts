import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarRoutingModule} from "./calendar-route.module";
import {FormsModule} from "@angular/forms";
import {CalendarComponent} from "./calendar.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CalendarRoutingModule
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
