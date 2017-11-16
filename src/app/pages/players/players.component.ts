import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../models/player';
import {isNull} from 'util';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit {

  seasonActive: Season;
  private _players: Player;

  constructor(
    private playerService: PlayerService,
    private seasonService: SeasonService
  ) {	}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(
      result => {
        this._players = result;
      },
      err => {

      }
    );

    if (!isNull(this.seasonService.getSeasonActive())) {
      this.seasonActive = this.seasonService.getSeasonActive();
    } else {
      this.seasonService.getInitSeasonActive().subscribe(
        result => {
          this.seasonActive = result.data[0];
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  get players(): Player {
    return this._players;
  }

  set players(value: Player) {
    this._players = value;
  }

}
