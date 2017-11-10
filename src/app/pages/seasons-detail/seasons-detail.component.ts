import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SeasonService} from '../../services/season.service';
import {ScriptService} from '../../services/script.service';
import {isNull} from 'util';
import {Season} from "../../models/season";

@Component({
  selector: 'app-seasons-detail',
  templateUrl: './seasons-detail.component.html',
  styleUrls: ['./seasons-detail.component.css']
})
export class SeasonsDetailComponent implements OnInit {

  seasonActive: Season;

  constructor(private route: ActivatedRoute,
              private seasonService: SeasonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] !== this.seasonService.getSeasonActive().id.toString()) {
        this.seasonService.getSeason(params['id']).subscribe(
          result => {
            this.seasonActive = result;
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.seasonActive = this.seasonService.getSeasonActive();
      }
    });
  }
}
