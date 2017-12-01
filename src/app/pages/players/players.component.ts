import { Component, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../models/player';
import {isNull} from 'util';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {ScriptService} from '../../services/script.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit {
  model: any = {};
  seasonActive: Season;
  layout = 'Nuevo jugador';

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }

  private _players: Player[];

  constructor(
    private playerService: PlayerService,
    private seasonService: SeasonService,
    private scriptService: ScriptService
  ) {	}

  ngOnInit(): void {
    const scriptService = this.scriptService;
    this.playerService.getPlayers().subscribe(
      result => {
        debugger;
        this._players = result.data;
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

  savePlayer() {
    this.playerService.savePlayer(this.model.name, this.model.logo, this.seasonActive.id).subscribe(
      result => {
        swal({
          position: 'top-right',
          type: 'success',
          title: 'Jugador ' + this.model.name + ' creado.',
          showConfirmButton: false,
          timer: 1500
        });
        this.model.name = '';
        this.model.logo = '';
        this.players.push(result.data);
        this.seasonActive.players.push(result.data);
        this.seasonService.setSeasonLocalStorage(this.seasonActive);
      },
      err => {
        swal(
          'Error creando al jugador. Error: ' + err.status,
          'error'
        );
      }
    );
  }

  //TODO: Borrar goles y asistencias del jugador que se borra (parece que lo hace bien, comprobar)
  deletePlayer(playerId: number, playerName: string) {
    const playerService = this.playerService;
    const self = this;
    swal({
      title: 'Vas a borrar al jugador ' + playerName + '\n¿Estas seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
    }).then(function (result) {
      if (result.value) {
        playerService.deletePlayer(playerId).subscribe(
          data => {
            swal(
              'Borrado',
              'El jugador ' + data.data.name + ' ha sido borrado.',
              'success'
            );
            self.players = self.players.filter(item => item.id !== data.data.id);
          },
          err => {
            swal(
              'Borrado',
              'Error borrando al jugador. Error: ' + err.status,
              'error'
            );
          }
        );
      } else if (result.dismiss === 'cancel') {
        swal({
          title: 'Borrado cancelado',
          type: 'info'
        });
      }
    });
  }
}
