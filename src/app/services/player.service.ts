import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Player} from '../models/player';
import 'rxjs/add/operator/publishReplay';
import {SeasonService} from "./season.service";

@Injectable()
export class PlayerService {
  private _access_token: string;
  private players: Observable<Player>;

  constructor(private http: Http,
              private seasonService: SeasonService,) {
  }

  getPlayers(): Observable<Player> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    const headers = new Headers({'Authorization': 'Bearer ' + this._access_token});
    const options = new RequestOptions({headers: headers});
    return this.http.get('http://lahmp.app/api/players/season/' + this.seasonService.getSeasonActive().year, options)
      .map((response: Response) => {
          return response.json().data;
        }
      ).publishReplay(1).refCount();
  }
}
