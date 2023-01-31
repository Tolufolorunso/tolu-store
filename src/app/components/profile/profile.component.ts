import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  role: string = '';
  //@ts-ignore
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router) {
    if (!this.user) {
      this.router.navigate(['/users/login']);
    }
  }
  ngOnInit(): void {
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.username = this.user.username;
    this.role = this.user.role as unknown as string;
  }
}
