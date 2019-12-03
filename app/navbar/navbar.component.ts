import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.loginService.onLogout().subscribe();
    localStorage.removeItem('userData');
    this.route.navigate(['/login']);
  }
}
