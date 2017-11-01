import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import * as $ from 'jquery';
import {ScriptService} from '../../services/script.service';
import {SeasonService} from '../../services/season.service';
import {Season} from '../../models/season';

@Component({
  selector: 'ma-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {

  loadAPI: Promise<any>;
  name: any;

  get seasonActive(): Season {
    return this._seasonActive;
  }

  set seasonActive(value: Season) {
    this._seasonActive = value;
  }

  private _seasonActive: Season;

  constructor(
    private authenticationService: AuthenticationService,
    private scriptService: ScriptService,
    private seasonService: SeasonService
  ) {
    this.name = JSON.parse(localStorage.getItem('infoUser')).name;
  }

  ngOnInit(): void {
    this.scriptService.loadScripts('../../assets/js/sidebarmenu.js');
    this.scriptService.loadScripts('../../assets/js/custom.js');
    this.seasonActive = this.seasonService.getSeasonActive();
  }

  logout() {
    this.authenticationService.logout();
  }

  public loadScripts(urlScript) {
    this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      const scriptNotExists = $('script[src*="' + urlScript + '"]').length === 0;
      if (scriptNotExists) {
        this.loadScript(urlScript);
      }else {
        console.log('Script already exists.');
        this.removeScript(urlScript);
        this.loadScript(urlScript);
      }
    });
  }

  public loadScript(urlScript) {
    console.log('preparing to load...')
    const node = document.createElement('script');
    node.src = urlScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public removeScript(urlScript) {
    $('script[src*="' + urlScript + '"]').remove();
  }
}
