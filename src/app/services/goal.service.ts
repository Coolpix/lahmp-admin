import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SeasonService} from './season.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Players} from '../models/players';

@Injectable()
export class GoalService {
  private _access_token: string;

  constructor(
    private http: HttpClient,
    private seasonService: SeasonService) {
  }

  getGoals(): Observable<Players> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Players>('http://lahmp.app/api/goals/season/' + this.seasonService.getSeasonActive().year, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  getGoalsByTeam(teamId: number): Observable<Players> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Players>('http://lahmp.app/api/goals/team/' + teamId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  saveGoal(matchId: number, playerId: number, teamId: number, seasonId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'match': matchId,
      'player': playerId,
      'team': teamId,
      'season': seasonId,
      'assist': null
    };
    return this.http.post('http://lahmp.app/api/goals', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  deleteGoal(goalId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.delete('http://lahmp.app/api/goals/' + goalId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
