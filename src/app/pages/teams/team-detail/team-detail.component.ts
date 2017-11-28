import { Component, OnInit } from '@angular/core';
import {isNull} from 'util';
import {SeasonService} from '../../../services/season.service';
import {Season} from '../../../models/season';
import {ActivatedRoute} from '@angular/router';
import {ScriptService} from '../../../services/script.service';
import swal from 'sweetalert2';
import {PlayerService} from '../../../services/player.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  model: any = {};
  seasonActive: Season;
  layout = 'Añadir jugador';

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

  addPlayers() {
    this.route.params.subscribe(
      params => {
        for (let i = 0; i < this.model.players.length; i++) {
          debugger;
          this.playerService.addTeamToPlayer(this.model.players[i], this.seasonActive.players[i].name, this.seasonActive.players[i].photo, this.seasonActive.id, [], [], params['idteam']).subscribe(
            data => {
              debugger;
              swal({
                position: 'top-right',
                type: 'success',
                title: 'Jugadores añadidos.',
                showConfirmButton: false,
                timer: 1500
              });
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
}
