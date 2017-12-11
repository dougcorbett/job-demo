import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string;

  constructor(private authService: AuthService,
              private router: Router,) { }

  ngOnInit() {
    //this.userName = this.authService.currentUser.userName;
  }

  isAuthenticated(): boolean {
    //console.log(this.authService.currentUser);
    return this.authService.isAuthenticated();
    //return false;
  }

  logout() {
    // logout
    this.authService.logout().subscribe(() =>
      this.router.navigate(['/login']));
  }

}
