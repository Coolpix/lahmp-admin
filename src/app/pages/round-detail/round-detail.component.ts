import {Component, OnInit} from '@angular/core';
import {isNull} from 'util';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {MatchService} from '../../services/match.service';
import {Match} from '../../models/match';
import {ActivatedRoute} from '@angular/router';
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
    private seasonService: SeasonService,
    private matchService: MatchService,
    private scriptService: ScriptService
  ) {this.scriptService.loadScripts('../../assets/js/bootstrap-select.min.js'); }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['idround']) {
          this.matchService.getMatchesByRound(params['idround']).subscribe(
            result => {
              this.matches = result.data;
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
    const modal = this.model;
    this.route.params.subscribe(
      params => {
        if (params['idround']) {
          this.matchService.saveMatch(this.seasonActive.id, params['idround'], this.model.local, this.model.visitor).subscribe(
            result => {
              console.log(result);
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
}
