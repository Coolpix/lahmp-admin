import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import * as $ from 'jquery';
import {ScriptService} from "../../services/script.service";

@Component({
  selector: 'ma-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit{

  loadAPI: Promise<any>;
  name: any;

  constructor(private authenticationService: AuthenticationService, private scriptService: ScriptService) {
    this.name = JSON.parse(localStorage.getItem('infoUser')).name;
  }

  ngOnInit(): void {
    this.scriptService.loadScripts('../../assets/js/sidebarmenu.js');
    this.scriptService.loadScripts('../../assets/js/custom.js');
  }

  logout(){
    this.authenticationService.logout();
  }

  public loadScripts(urlScript) {
    this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      let scriptNotExists = $('script[src*="'+urlScript+'"]').length == 0;
      if (scriptNotExists){
        this.loadScript(urlScript);
      }else{
        console.log('Script already exists.');
        this.removeScript(urlScript);
        this.loadScript(urlScript);
      }
    });
  }

  public loadScript(urlScript) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = urlScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public removeScript(urlScript){
    $('script[src*="'+urlScript+'"]').remove();
  }
}
