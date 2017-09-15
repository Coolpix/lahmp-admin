import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ScriptService} from "../../services/script.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  error: string = '';
  loading: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private scriptService: ScriptService) {
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
                this.router.navigate(['/seasons/2017']);
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
        debugger;
        if (result.data.exception){
          this.error = result.data.exception;
        }else{
          this.error = "Correo mandado";
        }
      },
      err => {
        this.error = err.json().message;
      }
    )
  }

}
