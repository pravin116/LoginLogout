import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { User } from './login/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private grant_type = 'password';
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
    return !!sessionStorage.getItem('userData');
  }

  getToken() {
    return sessionStorage.getItem('userData');
  }

  onLogout() {
    sessionStorage.removeItem('userData');
    this.route.navigate(['/login']);
  }


}
