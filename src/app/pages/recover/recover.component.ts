import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScriptService} from "../../services/script.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit, OnDestroy {
  model: any = {};
  token: string;
  error: string = '';
  private sub: any;

  constructor(
    private scriptService: ScriptService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.scriptService.loadScripts('../../assets/js/sidebarmenu.js');
    this.scriptService.loadScripts('../../assets/js/custom.js');
    this.sub = this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  resetPassword(){
    this.error = '';
    this.authenticationService.reset(this.token, this.model.email, this.model.password, this.model.repassword).subscribe(
      result => {
        if (result.data){
          this.error = result.message;
        }else{
          this.error = "OK";
        }
      },
      err => {
        let error = err.json();
        if (error.password){
          this.error = error.password[0];
        }else{
          this.error = error.message;
        }
      }
    );
  }
}
