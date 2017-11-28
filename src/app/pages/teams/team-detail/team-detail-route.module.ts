import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent } from './team-detail.component';

const teamDetailRoutes: Routes = [{
  path: '',
  component: TeamDetailComponent,
  data: {
    title: 'Equipos',
    urls: [{title: 'LAHMP', url: '/seasons'}, {title: 'Equipos', url: '/teams'}, {title: 'Verde'}]
  }
}];

@NgModule({
  imports: [
    RouterModule.forChild(teamDetailRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TeamsRoutingModule { }
