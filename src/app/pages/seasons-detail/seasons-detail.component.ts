import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SeasonService} from '../../services/season.service';
import {ScriptService} from '../../services/script.service';

@Component({
  selector: 'app-seasons-detail',
  templateUrl: './seasons-detail.component.html',
  styleUrls: ['./seasons-detail.component.css']
})
export class SeasonsDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private seasonService: SeasonService,
              private scriptService: ScriptService) { }

  ngOnInit(): void {
    this.scriptService.loadScripts('../../assets/js/sidebarmenu.js');
    this.scriptService.loadScripts('../../assets/js/custom.js');
    this.route.params.subscribe(params => {
      this.seasonService.getSeason(params['id']).subscribe();
    });

  }
}
