import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  user!: User;
  role!: string;

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    const { token, user } = this.auth.getUser();
    const role = localStorage.getItem('role') as unknown as string;
    this.role = role;
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLogin = this.auth.isLogin;
        this.user = user;
        if (this.user) {
          this.isLogin = true;
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currLocation');
    localStorage.removeItem('role');
    this.auth.isLogin = false;
    window.location.reload();
  }
}
