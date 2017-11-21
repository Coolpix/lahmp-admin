import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Teams} from '../models/teams';
import {SeasonService} from './season.service';
import {Injectable} from '@angular/core';

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
    return this.http.get<Teams>('http://lahmp.app/api/teams/matches/' + this.seasonService.getSeasonActive().year, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  saveMatch(name: string, photo: string, seasonId: number): any {
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
    return this.http.post('http://lahmp.app/api/matches', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
