import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Season} from '../../models/season';

@Component({
  selector: 'ma-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Input() season: Season;
  @Output() seasonChange: EventEmitter<Season>;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.seasonChange = new EventEmitter<Season>();
  }

  ngOnInit(): void {

  }

  logout() {
    this.authenticationService.logout();
  }


}
