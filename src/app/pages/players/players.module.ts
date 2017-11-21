import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayersComponent} from './players.component';
import {PlayerRoutingModule} from './players-route.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlayerRoutingModule,
    FormsModule
  ],
  declarations: [
    PlayersComponent
  ]
})

export class PlayersModule {
}
