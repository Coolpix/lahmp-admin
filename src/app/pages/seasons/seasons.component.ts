import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {ScriptService} from '../../services/script.service';
import {isNull} from 'util';
import swal from 'sweetalert2';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})

export class SeasonsComponent implements OnInit {
  model: any = {};
  seasonActive: Season;
  layout = 'Nueva temporada';

  get seasons(): Season[] {
    return this._seasons;
  }

  set seasons(value: Season[]) {
    this._seasons = value;
  }

  private _seasons: Season[];
  objLoaderStatus: boolean;

  constructor(
    private router: Router,
    private seasonService: SeasonService,
    private scriptService: ScriptService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const scriptService = this.scriptService;
    this.objLoaderStatus = true;
    this.seasonService.getSeasons().subscribe(
      data => {
        this.seasons = data.data;
        this.objLoaderStatus = false;
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
          scriptService.loadScripts('../../assets/js/sticky-kit.min.js');
        }, 500, scriptService);
      },
      err => {
        console.log(err.statusText);
      }
    );

    if (!isNull(this.seasonService.getSeasonActive())) {
      debugger;
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

  goToSeason(seasonId: Number) {
    debugger;
    this.router.navigate([seasonId], { relativeTo: this.route });
  }

  saveSeason() {
    this.seasonService.saveSeason(this.model.name, this.model.year).subscribe(
      data => {
        swal({
          position: 'top-right',
          type: 'success',
          title: 'Temporada ' + this.model.year + ' creada.',
          showConfirmButton: false,
          timer: 1500
        });
        this.model.name = '';
        this.model.year = '';
        this.router.navigate([data.data.id], {relativeTo: this.route });
      },
      err => {
        swal(
          'Error creando la temporada. Error: ' + err.status,
          'error'
        );
      }
    );
  }

  deleteSeason(seasonId: number, seasonYear: number) {
    const seasonService = this.seasonService;
    const self = this;
    swal({
      title: 'Vas a borrar la temporada ' + seasonYear + '\n¿Estas seguro?',
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
        seasonService.deleteSeason(seasonId).subscribe(
          data => {
            swal(
              'Borrado',
              'La temporada ' + data.data.year + ' ha sido borrada.',
              'success'
            );
            self.seasons = self.seasons.filter(item => item.id !== data.data.id);
          },
          err => {
            swal(
              'Borrado',
              'Error borrando la temporada. Error: ' + err.status,
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
