import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Teams} from '../models/teams';
import {SeasonService} from './season.service';
import {Injectable} from '@angular/core';
import {Matches} from "../models/matches";

@Injectable()
export class MatchService {
  private _access_token: string;

  constructor(
    private http: HttpClient,
    private seasonService: SeasonService
  ) {}

  getMatches(): Observable<Teams> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Teams>('http://lahmp.app/api/matches/season/' + this.seasonService.getSeasonActive().year, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  getMatchesByRound(roundId: number): Observable<Matches> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Matches>('http://lahmp.app/api/matches/round/' + roundId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  saveMatch(seasonId: number, roundId: number, teamLocal: number, teamVisitor: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'season': seasonId,
      'teams': [teamLocal, teamVisitor],
      'round': roundId,
      'goals': [],
      'assists': []
    };
    return this.http.post('http://lahmp.app/api/matches', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
