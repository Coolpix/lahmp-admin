import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  private _access_token: string;

  constructor(private router: Router, private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._access_token = currentUser && currentUser._access_token;
  }

  get access_token(): string {
    return this._access_token ;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://lahmp.app/api/auth/token', JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const access_token = response.json() && response.json().access_token;
        if (access_token) {
          // set token property
          this.access_token = access_token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, access_token: access_token }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this._access_token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('infoUser');
    localStorage.removeItem('seasonActive');
    this.router.navigate(['/login']);
  }

  register(name: string, email: string, password: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://lahmp.app/api/auth/register', JSON.stringify({ name: name, email: email, password: password }), options)
      .map((response: Response) => {
        return response.json();
      });
  }

  sendEmail(email: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://lahmp.app/api/auth/email', JSON.stringify({ email: email }), options)
      .map((response: Response) => {
        return response.json();
      });
  }

  reset(token:string, email:string, password:string, repassword:string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://lahmp.app/api/auth/reset', JSON.stringify({ email: email, token: token, password: password, password_confirmation: repassword }), options)
      .map((response: Response) => {
          return response.json();
      });
  }
}
