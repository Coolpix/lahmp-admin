import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SeasonsComponent} from './seasons.component';
import {SeasonsDetailComponent} from './seasons-detail/seasons-detail.component';

const seasonsRoutes: Routes = [
  {
    path: '',
    component: SeasonsComponent,
    data: {
      title: 'Temporadas',
      urls: [{title: 'LAHMP', url: '/'}, {title: 'Temporadas'}]
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(seasonsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SeasonsRoutingModule { }
