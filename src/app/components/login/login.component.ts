import { Observable } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppService } from 'src/app/services/app.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private appService: AppService,
    private router: Router
  ) {
    const { token } = this.auth.getUser();
    if (token) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.appService.clearAlert();
  }

  login(): void {
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (response: any) => {
        this.auth.isLogin = true;
        const { message, user, token } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('user', JSON.stringify(user));
        const currLocation = localStorage.getItem('currLocation');
        if (currLocation) {
          this.router.navigate([currLocation]);
        } else {
          window.location.reload();
          this.router.navigate(['/']);
        }
        this.appService.showAlert({
          message: `${message}, Welcome ${user.firstname}`,
          type: 'success',
          show: true,
        });
      },
      error: (err) => {
        const {
          error: { message },
          statusText,
        } = err;
        this.loading = false;
        if (statusText === 'Unknown Error') {
          let message = 'Try again later, server down';
          this.appService.showAlert({
            message,
            show: true,
          });
          return;
        }
        this.appService.showAlert({
          message,
          show: true,
        });
      },
      complete: () => {
        this.username = '';
        this.password = '';
        setTimeout(() => {
          this.appService.clearAlert();
        }, 3000);
        this.loading = false;
      },
    });
  }
  close(): void {
    this.appService.clearAlert();
  }
}
