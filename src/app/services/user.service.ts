import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  getUser(): Observable<User> {
    // add authorization header with jwt token
    const headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.access_token});
    const options = new RequestOptions({headers: headers});
    // get users from api
    return this.http.get('http://lahmp.app/api/user', options)
      .map((response: Response) => {
          localStorage.setItem('infoUser', JSON.stringify({
            id: response.json().id,
            name: response.json().name,
            email: response.json().email
          }));
          return response.json();
        }
      );
  }
}
