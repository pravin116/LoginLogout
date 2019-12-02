import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  UserName:string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.UserName = params['userName'];
      });
      console.log(this.UserName)
  }

}
