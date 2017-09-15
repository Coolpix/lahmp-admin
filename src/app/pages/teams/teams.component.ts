import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
  }

}
