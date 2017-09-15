import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamsComponent} from "./teams.component";

const teamsRoutes: Routes = [{
  path: ':id',
  data: {
    title: 'Equipos',
    urls: [{title: 'LAHMP',url: '/'},{title: 'Equipos'},{title: 'Equipo Verde'}]
  },
  component: TeamsComponent
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
