import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Season} from '../models/season';
import {isUndefined} from 'util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Seasons} from '../models/seasons';

@Injectable()
export class SeasonService {
  private _access_token: string;

  constructor(private http: HttpClient) {
  }

  getSeasons(): Observable<Seasons> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Seasons>('http://lahmp.app/api/seasons', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  getSeason(seasonId: Number): Observable<Season> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    if (!isUndefined(seasonId)) {
      return this.http.get<Season>('http://lahmp.app/api/seasons/' + seasonId, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
      });
    }
  }

  getInitSeasonActive(): Observable<Seasons> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.get<Seasons>('http://lahmp.app/api/seasons?page[size]=1', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    }).map((seasons: Seasons) => {
      this.setSeasonLocalStorage(seasons.data[0]);
      return seasons;
    });
  }

  setSeasonLocalStorage(season: Season): void {
    localStorage.setItem('seasonActive', JSON.stringify(season));
  }

  getSeasonActive(): Season {
    return JSON.parse(localStorage.getItem('seasonActive'));
  }

  saveSeason(name: string, year: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const body = {
      'name': name,
      'year': year,
      'players': [],
      'matches': [],
      'rounds': [],
      'teams': []
    };
    return this.http.post('http://lahmp.app/api/seasons', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }

  deleteSeason(seasonId: number): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    return this.http.delete('http://lahmp.app/api/seasons/' + seasonId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._access_token),
    });
  }
}
