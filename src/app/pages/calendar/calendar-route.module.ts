import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./calendar.component";

const calendarRoutes: Routes = [{
  path: '',
  data: {
    title: 'Calendario'
  },
  component: CalendarComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(calendarRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CalendarRoutingModule { }
