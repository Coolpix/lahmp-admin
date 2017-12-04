import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ScriptService} from '../../services/script.service';
import {MatchService} from '../../services/match.service';
import {Match} from '../../models/match';
import {isNull} from 'util';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {PlayerService} from '../../services/player.service';
import {TeamService} from '../../services/team.service';
import {GoalService} from '../../services/goal.service';
import swal from 'sweetalert2';
import {AssistService} from '../../services/assist.service';
import {Player} from '../../models/player';
import {Goal} from '../../models/goal';
import {Assist} from "../../models/assist";

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})

//TODO: usar el unsubscribe en todos los subscribe de los demas componentes
export class MatchDetailComponent implements OnInit, OnDestroy {
  get totalAssists(): Array<Assist> {
    return this._totalAssists;
  }
  get goals(): Array<Goal> {
    return this._goals;
  }

  set goals(value: Array<Goal>) {
    this._goals = value;
  }
  get assists(): Array<Assist> {
    return this._assists;
  }

  set assists(value: Array<Assist>) {
    this._assists = value;
  }
  get playersVisitor(): Array<Player> {
    return this._playersVisitor;
  }
  get playersLocal(): Array<Player> {
    return this._playersLocal;
  }
  get match(): Match {
    return this._match;
  }

  set match(value: Match) {
    this._match = value;
  }

  private sub: any;
  private _match: Match;
  private _playersLocal: Array<Player>;
  private _playersVisitor: Array<Player>;
  private _goals: Array<Goal>;
  private _assists: Array<Assist>;
  private _totalAssists: Array<Assist> = [];
  private seasonId: number;
  private roundId: number;
  private matchId: number;

  model: any = {};
  layout = 'Finalizar partido';
  seasonActive: Season;

  constructor(
    private route: ActivatedRoute,
    private scriptService: ScriptService,
    private matchService: MatchService,
    private playerService: PlayerService,
    private teamService: TeamService,
    private goalService: GoalService,
    private assistService: AssistService,
    private seasonService: SeasonService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] && params['idround'] && params['idmatch']) {
        this.seasonId = params['id'];
        this.roundId = params['idround'];
        this.matchId = params['idmatch'];
        const scriptService = this.scriptService;
        this.matchService.getMatchById(params['idmatch']).subscribe(
          result => {
            this.match = result.data;
            this.goalService.getGoalsByMatch(this.matchId).subscribe(
              goals => {
                this.goals = goals.data;
                for (let i = 0; i < this.goals.length; i++) {
                  if (this.goals[i].assist !== null) {
                    this.assistService.getAssistsById(this.goals[i].assist.id).subscribe(
                      assist => {
                        this.assists = assist.data;
                        this._totalAssists.push(assist.data);
                        this.goals[i].assistPlayer = assist.data.player.name;
                      },
                      err => {
                        console.log('Error recuperando la asistencia ' + this.goals[i].assist.id);
                      }
                    );
                  }
                }
              },
              err => {
                console.log('Error recuperando los goles del partido ' + this.matchId);
              }
            );
            for (let i = 0; i < this.match.teams.length; i++) {
              this.teamService.getTeamById(this.match.teams[i].id).subscribe(
                teams => {
                  this.match.teams[i] = teams.data;
                  this.playerService.getPlayersByTeam(this.match.teams[i].id).subscribe(
                    players => {
                      players.data.map(player => {
                        if (player.team.id === this.match.teams[0].id) {
                          this._playersLocal = players.data;
                        } else {
                          this._playersVisitor = players.data;
                        }
                        player.goals = this.goals.filter(goal => goal.player.id === player.id);
                        player.assists = this.totalAssists.filter(assist => assist.player.id === player.id);
                        console.log('El jugador ' + player.name + ' ha metido ' + player.goals.length + ' goles');
                        console.log('El jugador ' + player.name + ' ha assistido ' + player.assists.length + ' veces');
                      });
                    }, err => {
                      console.log('Error recuperando los jugadores del equipo ' + this.match.teams[i].id);
                    }
                  );
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
                  console.log('Error cargando jugadores del equipo');
                }
              );
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    });

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addGoal(teamId: number) {
    this.goalService.saveGoal(this.matchId, this.model.playerGoal, teamId, this.seasonId).subscribe(
      result => {
        if (parseInt(this.model.playerAssist) > 0) {
          this.assistService.saveAssist(result.data.id, teamId, this.model.playerAssist, this.matchId, this.seasonId).subscribe(
            assist => {
              swal({
                position: 'top-right',
                type: 'success',
                title: 'Gol y asistencia añadidos.',
                showConfirmButton: false,
                timer: 1500
              });
              this.model.playerGoal = '0';
              this.model.playerAssist = '0';
            },
            error => {
              swal(
                'Error añadiendo assistencia. Error: ' + error.status
              );
            }
          );
        } else {
          swal({
            position: 'top-right',
            type: 'success',
            title: 'Gol añadido.',
            showConfirmButton: false,
            timer: 1500
          });
          this.model.playerGoal = 0;
        }
      },
      error => {
        swal(
          'Error añadiendo gol. Error: ' + error.status
        );
      }
    );
  }

  goalDisabled(): boolean {
    return parseInt(this.model.playerGoal) === 0 || this.model.playerGoal === undefined || parseInt(this.model.playerAssist) === 0 || this.model.playerAssist === undefined || this.model.playerGoal === this.model.playerAssist;
  }
}
