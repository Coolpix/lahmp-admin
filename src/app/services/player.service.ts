import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SeasonService} from './season.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Players} from '../models/players';

@Injectable()
export class PlayerService {
  private _access_token: string;

  constructor(
      private http: HttpClient,
      private seasonService: SeasonService) {
  }

  getPlayers(): Observable<Players> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Players>('http://lahmp.app/api/players/season/' + this.seasonService.getSeasonActive().year, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  getPlayersByTeam(teamId: number): Observable<Players> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Players>('http://lahmp.app/api/players/team/' + teamId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  savePlayer(name: string, photo: string, seasonId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'name': name,
      'photo': photo,
      'season': seasonId,
      'goals': [],
      'assists': [],
      'team': null
    };
    return this.http.post('http://lahmp.app/api/players', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  deletePlayer(playerId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.delete('http://lahmp.app/api/players/' + playerId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  updatePlayer(playerId: number, name: string, photo: string, seasonId: number, goals: Array<any>, assists: Array<any>, teamId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'name': name,
      'photo': photo,
      'season': seasonId,
      'goals': goals,
      'assists': assists,
      'team': teamId
    };
    return this.http.put('http://lahmp.app/api/players/' + playerId, body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
