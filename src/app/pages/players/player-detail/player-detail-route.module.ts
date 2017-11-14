import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayerDetailComponent} from './player-detail.component';

const playerDetailRoutes: Routes = [{
  path: '',
  data: {
    title: 'Jugadores',
    urls: [{title: 'LAHMP', url: '/'}, {title: 'Jugador'}, {title: 'Jugador 1'}]
  },
  component: PlayerDetailComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(playerDetailRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlayerDetailRouteModule { }
