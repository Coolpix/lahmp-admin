import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayersComponent} from './players.component';

const playerRoutes: Routes = [{
  path: '',
  data: {
    title: 'Jugadores',
    urls: [{title: 'LAHMP', url: '/seasons'}, {title: 'Jugadores'}]
  },
  component: PlayersComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(playerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlayerRoutingModule { }
