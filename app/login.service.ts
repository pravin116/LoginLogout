import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private grant_type = 'password';
  private _url = 'https://localhost:44315/token';
  
  constructor( private http : HttpClient,private route : Router) { }

  loginUser( user ){
    console.log(this._url);
    console.log(user,this.grant_type);
    return this.http.post<any>(this._url,[user,this.grant_type]);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  onLogout(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']); 
  }

  userAuthentication(userName,password){
    var data = "username="+userName+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.http.post(this._url+'/token',data,{headers:reqHeader});
  }
}
