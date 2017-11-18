import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../models/player';
import {isNull} from 'util';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {ScriptService} from '../../services/script.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit {

  seasonActive: Season;
  private _players: Player;

  constructor(
    private playerService: PlayerService,
    private seasonService: SeasonService,
    private scriptService: ScriptService
  ) {	}

  /*ngAfterViewChecked(): void {
    this.scriptService.loadScripts('../../assets/js/jquery.dataTables.min.js');
    const scriptService = this.scriptService;
    setTimeout(function () {
      scriptService.loadScripts('../../assets/js/dataTableInit.js');
      scriptService.loadScripts('../../assets/js/buttons.flash.min.js');
      scriptService.loadScripts('../../assets/js/jszip.min.js');
      scriptService.loadScripts('../../assets/js/pdfmake.min.js');
      scriptService.loadScripts('../../assets/js/vfs_fonts.js');
      scriptService.loadScripts('../../assets/js/buttons.html5.min.js');
      scriptService.loadScripts('../../assets/js/buttons.print.min.js');
      scriptService.loadScripts('../../assets/js/dataTables.buttons.min.js');
    }, 2000, scriptService);
  }*/

  ngOnInit(): void {
    const scriptService = this.scriptService;
    this.playerService.getPlayers().subscribe(
      result => {
        this._players = result;
        this.scriptService.loadScripts('../../assets/js/jquery.dataTables.min.js');
        setTimeout(function(){
          scriptService.loadScripts('../../assets/js/dataTables.buttons.min.js');
          scriptService.loadScripts('../../assets/js/buttons.flash.min.js');
          scriptService.loadScripts('../../assets/js/jszip.min.js');
          scriptService.loadScripts('../../assets/js/pdfmake.min.js');
          scriptService.loadScripts('../../assets/js/vfs_fonts.js');
          scriptService.loadScripts('../../assets/js/buttons.html5.min.js');
          scriptService.loadScripts('../../assets/js/buttons.print.min.js');
          scriptService.loadScripts('../../assets/js/dataTableInit.js');
        }, 500, scriptService);
      },
      err => {
        console.log(err);
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
