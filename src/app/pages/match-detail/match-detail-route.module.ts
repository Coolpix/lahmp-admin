import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailComponent } from './match-detail.component';

const matchDetailRoutes: Routes = [{
  path: '',
  data: {
    title: 'Partido',
    urls: [{title: 'LAHMP', url: '/'}, {title: 'Jornadas'}, {title: 'Jornada 1'}, {title: 'Partido 1' }]
  },
  component: MatchDetailComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(matchDetailRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MatchDetailRouteModule { }
