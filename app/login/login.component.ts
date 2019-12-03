import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails;
  loginCredentials = new User();

  constructor( private loginService : LoginService,
               private route : Router ) { }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.loginCredentials);
    this.loginService.loginUser(this.loginCredentials).subscribe(
      res => {
        this.loginDetails = res;
        console.log(res);
        sessionStorage.setItem('userData',this.loginDetails.userEmail);
        this.route.navigate(['/dashboard']);
      },
      err => console.log(err)
    )};
}
