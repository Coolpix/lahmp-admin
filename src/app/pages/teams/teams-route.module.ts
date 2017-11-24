import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamsComponent} from './teams.component';

const teamsRoutes: Routes = [{
  path: '',
  component: TeamsComponent,
  data: {
    title: 'Equipos',
    urls: [{title: 'LAHMP', url: '/seasons'}, {title: 'Equipos'}]
  }
}];

@NgModule({
  imports: [
    RouterModule.forChild(teamsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TeamsRoutingModule { }
