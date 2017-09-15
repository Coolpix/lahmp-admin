import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Season} from "../models/season";

@Injectable()
export class SeasonService {
  private _access_token: string;
  private seasons: Observable<Season>;
  private seasonActive: Observable<Season>;

  constructor(private http: Http) { }

  getSeasons(): Observable<Season> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    let headers = new Headers({'Authorization': 'Bearer ' + this._access_token});
    let options = new RequestOptions({headers: headers});
    if (!this.seasons){
      this.seasons = this.http.get('http://lahmp.app/api/seasons', options)
        .map((response: Response) => {
            return response.json().data
          }
        ).publishReplay(1).refCount();
    }
    return this.seasons;
  }

  getSeasonActive(): Observable<Season>{
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser.access_token;
    let headers = new Headers({'Authorization': 'Bearer ' + this._access_token});
    let options = new RequestOptions({headers: headers});
    if (!this.seasonActive){
      this.seasonActive = this.http.get('http://lahmp.app/api/seasons?page[size]=1', options)
        .map((response: Response) => {
            return response.json().data
          }
        ).publishReplay(1).refCount();
    }
    return this.seasonActive;
  }
}
