import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/index';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  }, {
    path: 'recover',
    loadChildren: './pages/recover/recover.module#RecoverModule'
  }, {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterModule'
  }, {
    path: 'seasons/:id/players',
    loadChildren: './pages/players/players.module#PlayersModule',
    canActivate: [AuthGuard]
  }, {
    path: 'seasons/:id/players/:idplayer',
    loadChildren: './pages/players/player-detail/player-detail.module#PlayerDetailModule',
    canActivate: [AuthGuard]
  }, {
    path: 'seasons/:id/teams',
    loadChildren: './pages/teams/teams.module#TeamsModule',
    canActivate: [AuthGuard]
  }, {
    path: 'seasons/:id/teams/:idteam',
    loadChildren: './pages/teams/team-detail/team-detail.module#TeamDetailModule',
    canActivate: [AuthGuard]
  }, {
    path: 'seasons',
    loadChildren: './pages/seasons/seasons.module#SeasonsModule',
    canActivate: [AuthGuard]
  }, {
    path: 'seasons/:id',
    loadChildren: './pages/seasons/seasons-detail/seasons-detail.module#SeasonsDetailModule',
    canActivate: [AuthGuard]
  }, {
    path: 'seasons/:id/round/:idround/match/:idmatch',
    loadChildren: './pages/match-detail/match-detail.module#MatchDetailModule',
    canActivate: [AuthGuard]
  }, {
    path: 'seasons/:id/round/:idround',
    loadChildren: './pages/round-detail/round-detail.module#RoundDetailModule',
    canActivate: [AuthGuard]
  }, {
    path: 'calendar',
    loadChildren: './pages/calendar/calendar.module#CalendarModule',
    canActivate: [AuthGuard]
  }, {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
