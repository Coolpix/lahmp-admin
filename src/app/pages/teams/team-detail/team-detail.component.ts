import { Component, OnInit } from '@angular/core';
import {isNull} from 'util';
import {SeasonService} from '../../../services/season.service';
import {Season} from '../../../models/season';
import {ActivatedRoute} from '@angular/router';
import {ScriptService} from '../../../services/script.service';
import swal from 'sweetalert2';
import {PlayerService} from '../../../services/player.service';
import {Match} from '../../../models/match';
import {Player} from '../../../models/player';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  model: any = {};
  seasonActive: Season;
  layout = 'Añadir jugador';

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }

  private _players: Player[];

  constructor(
    private route: ActivatedRoute,
    private scriptService: ScriptService,
    private seasonService: SeasonService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['idteam']) {
          const scriptService = this.scriptService;
          this.playerService.getPlayersByTeam(params['idteam']).subscribe(
            result => {
              this.players = result.data;
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
                scriptService.loadScripts('../../assets/js/bootstrap-select.min.js');
              }, 500, scriptService);
            },
            err => {
              console.log(err);
            }
          );
        }
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

  //TODO: bug agregando jugadores
  addPlayers() {
    this.route.params.subscribe(
      params => {
        for (let i = 0; i < this.model.players.length; i++) {
          debugger;
          this.playerService.updatePlayer(this.model.players[i].id, this.model.players[i].name, this.model.players[i].photo, this.seasonActive.id, this.model.players[i].goals, this.model.players[i].assists, params['idteam']).subscribe(
            data => {
              swal({
                position: 'top-right',
                type: 'success',
                title: 'Jugadores añadidos.',
                showConfirmButton: false,
                timer: 1500
              });
              this.players.push(data.data);
            },
            err => {
              swal(
                'Error añadiendo jugadores. Error: ' + err.status
              );
            }
          );
        }
      }
    );
  }

  removePlayer(player: Player) {
    this.route.params.subscribe(
      params => {
        this.playerService.updatePlayer(player.id, player.name, player.photo, this.seasonActive.id, [], [], null).subscribe(
          data => {
            swal({
              position: 'top-right',
              type: 'success',
              title: 'Jugador borrado del equipo.',
              showConfirmButton: false,
              timer: 1500
            });
            this.players.splice(this.players.indexOf(player), 1);
          },
          err => {
            swal(
              'Error borrado jugadores. Error: ' + err.status
            );
          }
        );
      }
    );
  }
}
