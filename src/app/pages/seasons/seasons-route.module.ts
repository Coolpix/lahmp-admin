import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SeasonsComponent} from './seasons.component';

const seasonsRoutes: Routes = [{
  path: '',
  data: {
    title: 'Temporadas',
    urls: [{title: 'LAHMP', url: '/'}, {title: 'Temporadas'}]
  },
  component: SeasonsComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(seasonsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SeasonsRoutingModule { }
