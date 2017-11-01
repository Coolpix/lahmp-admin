import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';

@Component({
  selector: 'ma-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  get seasonActive(): Season {
    return this._seasonActive;
  }

  set seasonActive(value: Season) {
    this._seasonActive = value;
  }

  private _seasonActive: Season;

  constructor(
    private authenticationService: AuthenticationService,
    private seasonService: SeasonService
  ) { }

  ngOnInit(): void {
    this.seasonActive = this.seasonService.getSeasonActive();
  }

  logout() {
    this.authenticationService.logout();
  }


}
