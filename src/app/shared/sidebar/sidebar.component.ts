import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ScriptService} from '../../services/script.service';
import {Season} from '../../models/season';
import {Round} from '../../models/round';

@Component({
  selector: 'ma-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  name: any;

  @Input() season: Season;
  @Output() seasonChange: EventEmitter<Season>;

  constructor(
    private authenticationService: AuthenticationService,
    private scriptService: ScriptService
  ) {
    this.seasonChange = new EventEmitter<Season>();
    this.name = JSON.parse(localStorage.getItem('infoUser')).name;
  }

  ngOnInit(): void {
    this.scriptService.loadScripts('../../assets/js/sidebarmenu.js');
    this.scriptService.loadScripts('../../assets/js/custom.js');
  }

  logout() {
    this.authenticationService.logout();
  }
}
