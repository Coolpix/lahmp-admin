import { Component, OnInit } from '@angular/core';
import {Season} from '../../models/season';
import {isNull} from 'util';
import {SeasonService} from '../../services/season.service';
import {Team} from '../../models/team';
import {TeamService} from '../../services/team.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  model: any = {};
  seasonActive: Season;

  get teams(): Team[] {
    return this._teams;
  }

  set teams(value: Team[]) {
    this._teams = value;
  }

  private _teams: Team[];

  constructor(
    private seasonService: SeasonService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(
      result => {
        this._teams = result.data;
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

  saveTeam() {
    this.teamService.saveTeam(this.model.name, this.model.photo, this.seasonActive.id).subscribe(
      result => {
        swal({
          position: 'top-right',
          type: 'success',
          title: 'Equipo ' + this.model.name + ' creado.',
          showConfirmButton: false,
          timer: 1500
        });
        this.model.name = '';
        this.model.photo = '';
        this.teams.push(result.data);
      },
      err => {
        swal(
          'Error creando al equipo. Error: ' + err.status,
          'error'
        );
      }
    );
  }

  deleteTeam(teamId: number, teamName: string) {
    const teamService = this.teamService;
    const self = this;
    swal({
      title: 'Vas a borrar al equipo ' + teamName + '\n¿Estas seguro?',
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
        teamService.deleteTeam(teamId).subscribe(
          data => {
            swal(
              'Borrado',
              'El equipo ' + data.data.name + ' ha sido borrado.',
              'success'
            );
            self.teams = self.teams.filter(item => item.id !== data.data.id);
          },
          err => {
            swal(
              'Borrado',
              'Error borrando al equipo. Error: ' + err.status,
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
