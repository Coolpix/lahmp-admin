import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Season} from '../models/season';
import {isNull, isUndefined} from 'util';

@Injectable()
export class SeasonService {
  private _access_token: string;
  private seasonActive: Observable<Season>;

  constructor(private http: Http) {
  }

  getSeasons(): Observable<Season> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const headers = new Headers({'Authorization': 'Bearer ' + this._access_token});
    const options = new RequestOptions({headers: headers});
    return this.http.get('http://lahmp.app/api/seasons', options)
      .map((response: Response) => {
          return response.json().data;
        }
      ).publishReplay(1).refCount();
  }

  getSeason(seasonId: Number): Observable<Season> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const headers = new Headers({'Authorization': 'Bearer ' + this._access_token});
    const options = new RequestOptions({headers: headers});
    if (!isUndefined(seasonId)) {
      return this.http.get('http://lahmp.app/api/seasons/' + seasonId, options)
        .map((response: Response) => {
            this.setSeasonLocalStorage(response.json().data);
            return response.json().data;
          }
        ).publishReplay(1).refCount();
    }
  }

  getInitSeasonActive(): Observable<Season> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const headers = new Headers({'Authorization': 'Bearer ' + this._access_token});
    const options = new RequestOptions({headers: headers});
      return this.http.get('http://lahmp.app/api/seasons?page[size]=1', options)
        .map((response: Response) => {
            const season = response.json().data[0];
            this.setSeasonLocalStorage(season);
            this.seasonActive = season;
            return season;
          }
        ).publishReplay(1).refCount();
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
}
