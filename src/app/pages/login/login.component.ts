import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ScriptService} from '../../services/script.service';
import {SeasonService} from "../../services/season.service";
import {Season} from "../../models/season";
import {Observable} from "rxjs/Observable";
import {isNull} from "util";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  error = '';
  loading: boolean;
  seasonActive: Season;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private scriptService: ScriptService,
              private seasonService: SeasonService) {
  }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.scriptService.loadScripts('../../assets/js/sidebarmenu.js');
    this.scriptService.loadScripts('../../assets/js/custom.js');
  }

  login() {
    this.loading = true;
    this.error = '';
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          if (result === true) {
            this.userService.getUser().subscribe(
              result => {
                this.seasonActive = this.seasonService.getSeasonActive();
                if (!isNull(this.seasonActive)) {
                  this.router.navigate(['/seasons/' + this.seasonActive.id]);
                }else {
                  this.seasonService.getInitSeasonActive().subscribe(
                    result => {
                      this.router.navigate(['/seasons/' + result.id]);
                    },
                    err => {
                      console.log(err);
                    }
                  );
                }

              }
            );
          } else {
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
        },
        err => {
          this.error = err.json().message;
          this.loading = false;
        });
  }

  sendEmail() {
    this.authenticationService.sendEmail(this.model.email).subscribe(
      result => {
        if (result.data.exception) {
          this.error = result.data.exception;
        } else {
          this.error = 'Correo mandado';
        }
      },
      err => {
        this.error = err.json().message;
      }
    );
  }

}
