import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SeasonService} from "../../services/season.service";
import {Season} from "../../models/season";

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})

export class SeasonsComponent implements OnInit{
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

  private _seasons:Season;
  private _seasonActive:Season;
  objLoaderStatus: boolean;

  constructor(
    private router: Router,
    private seasonService: SeasonService
  ) { }

  ngOnInit(): void {
    this.objLoaderStatus = true;
    this.seasonService.getSeasons().subscribe(
      result => {
        this.seasonActive = result[0];
        this.seasons = result;
        this.objLoaderStatus = false;
      },
      err => {
        console.log(err.statusText);
      }
    )
  }

  goToSeason(seasonId: Number){
    this.router.navigate(['/seasons/'+seasonId]);
  }
}
