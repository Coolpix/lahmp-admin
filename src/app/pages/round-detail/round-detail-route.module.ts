import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoundDetailComponent} from "./round-detail.component";

const roundDetailRoutes: Routes = [{
  path: '',
  data: {
    title: 'Jornadas',
    urls: [{title: 'LAHMP',url: '/'},{title: 'Jornada'},{title: 'Jornada 1'}]
  },
  component: RoundDetailComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(roundDetailRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoundDetailRouteModule { }
