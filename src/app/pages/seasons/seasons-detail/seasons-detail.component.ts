import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SeasonService} from '../../../services/season.service';
import {Season} from '../../../models/season';
import swal from 'sweetalert2';
import {RoundService} from '../../../services/round.service';

@Component({
  selector: 'app-seasons-detail',
  templateUrl: './seasons-detail.component.html',
  styleUrls: ['./seasons-detail.component.css']
})
export class SeasonsDetailComponent implements OnInit {
  model: any = {};
  seasonActive: Season;
  layout = 'Nueva jornada';

  constructor(private route: ActivatedRoute,
              private seasonService: SeasonService,
              private roundService: RoundService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] !== this.seasonService.getSeasonActive().id.toString()) {
        this.seasonService.getSeason(params['id']).subscribe(
          result => {
            this.seasonService.setSeasonLocalStorage(result.data);
            this.seasonActive = result.data;
          },
          error => {
            console.log(error);
          }
        );
      } else {
        debugger;
        this.seasonActive = this.seasonService.getSeasonActive();
      }
    });
  }

  saveRound() {
    this.roundService.saveRound(this.model.name, this.seasonActive.id).subscribe(
      data => {
        swal({
          position: 'top-right',
          type: 'success',
          title: 'Jornada ' + this.model.name + ' creada.',
          showConfirmButton: false,
          timer: 1500
        });
        this.model.name = '';
        //this.players.push(result.data);
      },
      err => {
        swal(
          'Error creando la temporada. Error: ' + err.status,
          'error'
        );
      }
    );
  }
}
