import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {Player} from "../../models/player";

@Component({
	selector: 'app-players',
	templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit {
  private _players: Player;

	constructor(
	  private playerService: PlayerService
  ) {	}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(
      result => {
        this._players = result;
      },
      err => {

      }
    );
  }

  get players(): Player {
    return this._players;
  }

  set players(value: Player) {
    this._players = value;
  }

}
