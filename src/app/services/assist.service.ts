import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SeasonService} from './season.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Players} from '../models/players';

@Injectable()
export class AssistService {
  private _access_token: string;

  constructor(
    private http: HttpClient,
    private seasonService: SeasonService) {
  }

  getAssists(): Observable<Players> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Players>('http://lahmp.app/api/assists/season/' + this.seasonService.getSeasonActive().year, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  getAssistsByTeam(teamId: number): Observable<Players> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Players>('http://lahmp.app/api/assists/team/' + teamId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  saveAssist(goalId: number, teamId: number, playerId: number, matchId: number, seasonId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'goal': goalId,
      'team': teamId,
      'player': playerId,
      'match': matchId,
      'season': seasonId
    };
    return this.http.post('http://lahmp.app/api/assists', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  deleteAssist(goalId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.delete('http://lahmp.app/api/assists/' + goalId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
