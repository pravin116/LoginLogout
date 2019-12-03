import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './login/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url = 'https://localhost:44348/';

  constructor(private http: HttpClient, private route: Router) { }

  loginUser(loginCredentials: User): Observable<User[]> {
    const url = `${this._url}login`;
    return this.http.post<User[]>(url, loginCredentials);

  }

  onResetPassword(resetPassword: User): Observable<User[]> {
    const url = `${this._url}resetPassword`;
    return this.http.put<User[]>(url, resetPassword);
  }

  loggedIn() {
    return !!localStorage.getItem('userData');
  }

  getToken() {
    return localStorage.getItem('userData');
  }

  onLogout(): Observable<any> {
    const url = `${this._url}Logout`;
    return this.http.post<any>(url, '');
  }


}
