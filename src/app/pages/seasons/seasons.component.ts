import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {ScriptService} from '../../services/script.service';
import {isNull} from 'util';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})

export class SeasonsComponent implements OnInit, AfterViewChecked {

  model: any = {};
  seasonActive: Season;

  get seasons(): Season {
    return this._seasons;
  }

  set seasons(value: Season) {
    this._seasons = value;
  }

  private _seasons: Season;
  objLoaderStatus: boolean;

  constructor(
    private router: Router,
    private seasonService: SeasonService,
    private scriptService: ScriptService
  ) { }

  ngOnInit(): void {
    this.objLoaderStatus = true;
    this.seasonService.getSeasons().subscribe(
      result => {
        this.seasons = result;
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
          this.seasonActive = result;
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
    this.router.navigate(['/seasons/' + seasonId]);
  }

  saveSeason() {

    console.log(this.model.name);
  }
}
