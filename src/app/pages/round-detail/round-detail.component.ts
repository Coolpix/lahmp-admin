import {Component, OnInit} from '@angular/core';
import {isNull} from 'util';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {MatchService} from '../../services/match.service';
import {Match} from '../../models/match';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ScriptService} from '../../services/script.service';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})

export class RoundDetailComponent implements OnInit {
  model: any = {};
  layout = 'Nuevo partido';
  seasonActive: Season;

  get matches(): Match[] {
    return this._matches;
  }

  set matches(value: Match[]) {
    this._matches = value;
  }

  private _matches: Match[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seasonService: SeasonService,
    private matchService: MatchService,
    private scriptService: ScriptService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['idround']) {
          const scriptService = this.scriptService;
          this.matchService.getMatchesByRound(params['idround']).subscribe(
            result => {
              this.matches = result.data;
              this.matches.map(match => {
                match.goalsLocal = match.goals.filter(goal => goal.team_id === match.teams[0].id).length;
                match.goalsVisitor = match.goals.filter(goal => goal.team_id === match.teams[1].id).length;
              });
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

  saveMatch() {
    this.route.params.subscribe(
      params => {
        if (params['idround']) {
          this.matchService.saveMatch(this.seasonActive.id, params['idround'], this.model.local, this.model.visitor).subscribe(
            result => {
              swal({
                position: 'top-right',
                type: 'success',
                title: 'Partido ' + result.data.teams[0].name + ' VS ' + result.data.teams[1].name + ' creado.',
                showConfirmButton: false,
                timer: 1500
              });
              this.model.local = '';
              this.model.visitor = '';
              this.matches.push(result.data);
            },
            error => {
              swal(
                'Error creando el partido. Error: ' + error.status
              );
            }
          );
        }
      }
    );
  }

  goToMatch(matchId: number) {
    this.router.navigate(['match', matchId], { relativeTo: this.route });
  }
}
