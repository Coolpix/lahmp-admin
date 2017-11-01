import { Component, OnInit } from '@angular/core';
import {ScriptService} from '../../services/script.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private scriptService: ScriptService) { }

  ngOnInit() {
    this.scriptService.loadScripts('../../assets/js/sidebarmenu.js');
    this.scriptService.loadScripts('../../assets/js/custom.js');
  }

  registerUser() {
    this.error = '';
    this.authenticationService.register(this.model.name, this.model.email, this.model.password).subscribe(
      result => {
        this.router.navigate(['/login']);
      },
      err => {
        const error = err.json();
        this.error = error[0];
      }
    );
  }

  isValid(): boolean{
    return (this.model.password === this.model.repassword) && this.model.password && this.model.password.length >= 6 && this.model.terms && this.model.email && this.model.name;
  }
}
