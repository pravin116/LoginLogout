import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router'
import { User } from '../login/models/User';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route : ActivatedRoute, 
              private loginService : LoginService,private router : Router) { }

  userEmail:string;
  resetPassword = new User();
  newPassword;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resetPassword.userEmail = params["email"];
      });
      console.log(this.userEmail)
  }

  onResetPassword(){
    this.loginService.onResetPassword(this.resetPassword)
    .subscribe((res)=>{
      this.newPassword=res;
      this.router.navigate(['/login']);
    },
    (err)=>{
      console.log(err);
    }
    )
  }
}
