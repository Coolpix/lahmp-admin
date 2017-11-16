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
      const season = seasons;
      this.setSeasonLocalStorage(season.data[0]);
      return season;
    });
  }

  setSeasonLocalStorage(season: Season): void {
    localStorage.setItem('seasonActive', JSON.stringify(season));
  }

  getSeasonActive(): Season {
    return JSON.parse(localStorage.getItem('seasonActive'));
  }

  saveSeason(): any {
    return true;
  }

  deleteSeason(seasonID: number): any{
    return true;
  }
}
