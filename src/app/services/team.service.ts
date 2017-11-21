import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Teams} from '../models/teams';
import {SeasonService} from './season.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TeamService {
  private _access_token: string;

  constructor(
    private http: HttpClient,
    private seasonService: SeasonService
  ) {}

  getTeams(): Observable<Teams> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Teams>('http://lahmp.app/api/teams/season/' + this.seasonService.getSeasonActive().year, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  saveTeam(name: string, photo: string, seasonId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'name': name,
      'logo': photo,
      'season': seasonId,
      'matches': [],
      'players': [],
      'goals': [],
      'assists': []
    };
    return this.http.post('http://lahmp.app/api/teams', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  deleteTeam(teamId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.delete('http://lahmp.app/api/teams/' + teamId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
