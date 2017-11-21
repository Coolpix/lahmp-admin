import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Teams} from '../models/teams';
import {SeasonService} from './season.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RoundService {
  private _access_token: string;

  constructor(
    private http: HttpClient,
    private seasonService: SeasonService
  ) {}

  getRounds(): Observable<Teams> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Teams>('http://lahmp.app/api/rounds/' + this.seasonService.getSeasonActive().year, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  saveRound(name: string, seasonId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'name': name,
      'season': seasonId,
      'matches': []
    };
    return this.http.post('http://lahmp.app/api/rounds', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
