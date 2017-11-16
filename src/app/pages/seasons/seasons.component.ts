import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {ScriptService} from '../../services/script.service';
import {isNull} from 'util';
import {Seasons} from '../../models/seasons';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})

export class SeasonsComponent implements OnInit, AfterViewChecked {
  model: any = {};
  seasonActive: Season;

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
    this.objLoaderStatus = true;
    this.seasonService.getSeasons().subscribe(
      data => {
        this.seasons = data.data;
        this.objLoaderStatus = false;
      },
      err => {
        console.log(err.statusText);
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

  ngAfterViewChecked(): void {
    this.scriptService.loadScripts('../../assets/js/jquery.dataTables.min.js');
    this.scriptService.loadScripts('../../assets/js/dataTableInit.js');
  }

  goToSeason(seasonId: Number) {
    this.router.navigate([seasonId], { relativeTo: this.route });
  }

  saveSeason() {
    console.log(this.model.name);
    console.log(+this.model.year);
  }

  deleteSeason(seasonId: Number) {
    console.log(seasonId);
  }

}
