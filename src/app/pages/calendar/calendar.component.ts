import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../services/script.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private scriptService: ScriptService) { }

  ngOnInit() {
    debugger;
    this.scriptService.loadScripts('../../assets/js/jquery-ui.min.js');
    this.scriptService.loadScripts('../../assets/js/moment.min.js');
    this.scriptService.loadScripts('../../assets/js/fullcalendar.min.js');
    this.scriptService.loadScripts('../../assets/js/cal-init.js');
  }

}
