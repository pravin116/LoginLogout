import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isloginError : boolean = false;
  loginCredentials ={}
  constructor( private loginService : LoginService,
               private route : Router ) { }

  ngOnInit() {
  }

  // loginUser(){
  //   console.log(this.loginCredentials);
  //   this.loginService.loginUser(this.loginCredentials).subscribe(
  //     res =>{ console.log(res)
  //     localStorage.setItem('token',res.token)
  //     this.route.navigate(['/dashboard']);
  //     },
  //     err => console.log(err)
  //   )};

  loginUser(userName,password){

    this.loginService.userAuthentication(userName,password)
    .subscribe((data:any)=>{
localStorage.setItem('token',data.access_token);
this.route.navigate(['/dashboard']);
    },
    (err : HttpErrorResponse)=>{
      this.isloginError = true;
    });

  }
}
