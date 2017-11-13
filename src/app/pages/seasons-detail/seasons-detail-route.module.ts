import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonsDetailComponent } from '../seasons-detail/seasons-detail.component';

const seasonsDetailRoutes: Routes = [{
  path: '',
  data: {
    title: 'Temporadas',
    urls: [{title: 'LAHMP', url: '/'}, {title: 'Temporadas'}, {title: '2017'}]
  },
  component: SeasonsDetailComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(seasonsDetailRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SeasonsDetailRoutingModule { }
