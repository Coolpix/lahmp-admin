import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app.routing';
import {AuthGuard} from './guards/auth.guard';
import {SeasonService} from './services/season.service';
import {ScriptService} from './services/script.service';
import {PlayerService} from './services/player.service';
import * as $ from 'jquery';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    SeasonService,
    PlayerService,
    ScriptService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
