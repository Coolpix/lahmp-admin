import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';
import {ScriptService} from '../../services/script.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})

export class SeasonsComponent implements OnInit, AfterViewChecked {

  model: any = {};
  get seasonActive(): Season {
    return this._seasonActive;
  }

  set seasonActive(value: Season) {
    this._seasonActive = value;
  }
  get seasons(): Season {
    return this._seasons;
  }

  set seasons(value: Season) {
    this._seasons = value;
  }

  private _seasons: Season;
  private _seasonActive: Season;
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
